import { Injectable, signal, computed } from '@angular/core';
import {
  Player,
  PlayerStats,
  createDefaultPlayer,
  Gender,
  Interest,
  getRoleByAge
} from '../models/player.model';
import {
  Room,
  RoomType,
  createDefaultRoom
} from '../models/room.model';
import {
  Task,
  TASK_DEFINITIONS,
  createTaskFromDefinition,
  getTaskEffectiveTime
} from '../models/task.model';
import {
  GameState,
  GameTime,
  createInitialGameTime
} from '../models/game-state.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly _gameState = signal<GameState | null>(null);
  private gameTickInterval: ReturnType<typeof setInterval> | null = null;
  
  readonly gameState = this._gameState.asReadonly();
  
  readonly player = computed(() => this._gameState()?.player ?? null);
  readonly rooms = computed(() => this._gameState()?.rooms ?? []);
  readonly tasks = computed(() => this._gameState()?.tasks ?? []);
  readonly time = computed(() => this._gameState()?.time ?? null);
  readonly isRunning = computed(() => this._gameState()?.isRunning ?? false);
  readonly isPaused = computed(() => this._gameState()?.isPaused ?? false);
  readonly activeRoom = computed(() => {
    const state = this._gameState();
    if (!state?.activeRoomId) return null;
    return state.rooms.find(r => r.id === state.activeRoomId) ?? null;
  });
  readonly activeTask = computed(() => {
    const state = this._gameState();
    if (!state?.activeTaskId) return null;
    return state.tasks.find(t => t.id === state.activeTaskId) ?? null;
  });
  
  readonly unlockedRooms = computed(() => this.rooms().filter(r => r.isUnlocked));
  
  readonly personalTasks = computed(() => 
    this.tasks().filter(t => t.category === 'personal')
  );
  
  readonly socialTasks = computed(() => 
    this.tasks().filter(t => t.category === 'social')
  );
  
  readonly dailyTasks = computed(() => 
    this.tasks().filter(t => t.frequency === 'daily' && !t.completedToday)
  );
  
  readonly weeklyTasks = computed(() => 
    this.tasks().filter(t => t.frequency === 'weekly' && t.completedThisWeek < t.timesPerWeek)
  );

  initializeGame(
    playerName: string,
    gender: Gender,
    age: number,
    interests: Interest[]
  ): void {
    const player = createDefaultPlayer(playerName, gender, age, interests);
    
    // Начальные комнаты - разблокированы спальня и санузел
    const rooms: Room[] = [
      createDefaultRoom('bedroom', true),
      createDefaultRoom('bathroom', true),
      createDefaultRoom('kitchen', true),
      createDefaultRoom('hallway', true),
      createDefaultRoom('living_room', false),
      createDefaultRoom('library', false)
    ];
    
    // Создаём задачи из определений
    const tasks: Task[] = TASK_DEFINITIONS.map(def => createTaskFromDefinition(def));
    
    const gameState: GameState = {
      player,
      rooms,
      tasks,
      time: createInitialGameTime(),
      isRunning: false,
      isPaused: false,
      activeRoomId: rooms[0].id,
      activeTaskId: null,
      currentScene: 'game'
    };
    
    this._gameState.set(gameState);
  }

  startGame(): void {
    this.updateState(state => ({
      ...state,
      isRunning: true,
      isPaused: false
    }));
    this.startGameTick();
  }

  pauseGame(): void {
    this.updateState(state => ({
      ...state,
      isPaused: true
    }));
    this.stopGameTick();
  }

  resumeGame(): void {
    this.updateState(state => ({
      ...state,
      isPaused: false
    }));
    this.startGameTick();
  }

  stopGame(): void {
    this.updateState(state => ({
      ...state,
      isRunning: false,
      isPaused: false
    }));
    this.stopGameTick();
  }

  selectRoom(roomId: string): void {
    this.updateState(state => ({
      ...state,
      activeRoomId: roomId
    }));
  }

  selectTask(taskId: string | null): void {
    this.updateState(state => ({
      ...state,
      activeTaskId: taskId
    }));
  }

  startTask(taskId: string): boolean {
    const state = this._gameState();
    if (!state) return false;
    
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return false;
    
    // Проверяем требования
    for (const req of task.requirements) {
      if (state.player.stats[req.stat] < req.minValue) {
        return false;
      }
    }
    
    this.updateState(s => ({
      ...s,
      activeTaskId: taskId
    }));
    
    return true;
  }

  completeTask(taskId: string): void {
    const state = this._gameState();
    if (!state) return;
    
    const taskIndex = state.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;
    
    const task = state.tasks[taskIndex];
    const updatedTasks = [...state.tasks];
    
    updatedTasks[taskIndex] = {
      ...task,
      completedToday: true,
      completedThisWeek: task.completedThisWeek + 1,
      progress: 100,
      currentPhase: 'rest'
    };
    
    // Применяем награды
    const updatedStats = { ...state.player.stats };
    for (const reward of task.rewards) {
      updatedStats[reward.stat] = Math.min(100, updatedStats[reward.stat] + reward.value);
    }
    
    // Тратим время
    const effectiveTime = getTaskEffectiveTime(task);
    const newTime = this.advanceTime(state.time, effectiveTime);
    
    this._gameState.set({
      ...state,
      tasks: updatedTasks,
      player: {
        ...state.player,
        stats: updatedStats
      },
      time: newTime,
      activeTaskId: null
    });
    
    // Проверяем, не наступил ли конец дня
    this.checkEndOfDay();
  }

  unlockRoom(roomType: RoomType): boolean {
    const state = this._gameState();
    if (!state) return false;
    
    const roomIndex = state.rooms.findIndex(r => r.type === roomType);
    if (roomIndex === -1) return false;
    
    const room = state.rooms[roomIndex];
    if (room.isUnlocked) return false;
    
    const updatedRooms = [...state.rooms];
    updatedRooms[roomIndex] = { ...room, isUnlocked: true };
    
    this._gameState.set({
      ...state,
      rooms: updatedRooms
    });
    
    return true;
  }

  updatePlayerStat(stat: keyof PlayerStats, value: number): void {
    this.updateState(state => ({
      ...state,
      player: {
        ...state.player,
        stats: {
          ...state.player.stats,
          [stat]: Math.max(0, Math.min(100, value))
        }
      }
    }));
  }

  modifyPlayerStat(stat: keyof PlayerStats, delta: number): void {
    const current = this._gameState()?.player.stats[stat] ?? 0;
    this.updatePlayerStat(stat, current + delta);
  }

  setGameSpeed(speed: number): void {
    this.updateState(state => ({
      ...state,
      time: {
        ...state.time,
        cycleSpeed: speed
      }
    }));
  }

  private startGameTick(): void {
    if (this.gameTickInterval) return;
    
    // Один тик = 1 игровая минута, в реальном времени зависит от скорости
    this.gameTickInterval = setInterval(() => {
      const state = this._gameState();
      if (!state || state.isPaused) return;
      
      // Продвигаем время на 1 минуту
      const newTime = this.advanceTime(state.time, 1);
      
      // Расходуем статы со временем
      const updatedStats = this.decayStats(state.player.stats);
      
      this._gameState.set({
        ...state,
        time: newTime,
        player: {
          ...state.player,
          stats: updatedStats
        }
      });
      
      this.checkEndOfDay();
    }, 1000 / (this._gameState()?.time.cycleSpeed ?? 1));
  }

  private stopGameTick(): void {
    if (this.gameTickInterval) {
      clearInterval(this.gameTickInterval);
      this.gameTickInterval = null;
    }
  }

  private advanceTime(time: GameTime, minutes: number): GameTime {
    let newMinute = time.currentMinute + minutes;
    let newHour = time.currentHour;
    let newDay = time.currentDay;
    let newWeek = time.currentWeek;
    let newMonth = time.currentMonth;
    
    while (newMinute >= 60) {
      newMinute -= 60;
      newHour++;
    }
    
    while (newHour >= 24) {
      newHour -= 24;
      newDay++;
    }
    
    while (newDay > 7) {
      newDay -= 7;
      newWeek++;
    }
    
    while (newWeek > 4) {
      newWeek -= 4;
      newMonth++;
    }
    
    return {
      ...time,
      currentMinute: newMinute,
      currentHour: newHour,
      currentDay: newDay,
      currentWeek: newWeek,
      currentMonth: newMonth
    };
  }

  private decayStats(stats: PlayerStats): PlayerStats {
    // Каждую минуту статы немного уменьшаются
    return {
      ...stats,
      energy: Math.max(0, stats.energy - 0.02),
      hygiene: Math.max(0, stats.hygiene - 0.01),
      satisfaction: Math.max(0, stats.satisfaction - 0.01)
    };
  }

  private checkEndOfDay(): void {
    const state = this._gameState();
    if (!state) return;
    
    // Если время 23:00 или позже, и энергия низкая - пора спать
    if (state.time.currentHour >= 23 && state.player.stats.energy < 20) {
      // Автоматический отход ко сну
      this.triggerSleep();
    }
    
    // Проверяем здоровье
    if (state.player.stats.health <= 0) {
      this.updateState(s => ({
        ...s,
        currentScene: 'gameover'
      }));
      this.stopGameTick();
    }
  }

  private triggerSleep(): void {
    const state = this._gameState();
    if (!state) return;
    
    // Сбрасываем ежедневные задачи
    const updatedTasks = state.tasks.map(task => ({
      ...task,
      completedToday: false,
      progress: 0,
      currentPhase: 'preparation' as const
    }));
    
    // Восстанавливаем энергию за сон
    const sleepHours = Math.min(8, 24 - state.time.currentHour + 6);
    const energyRecovery = sleepHours * 12;
    
    this._gameState.set({
      ...state,
      tasks: updatedTasks,
      player: {
        ...state.player,
        hoursSlept: sleepHours,
        stats: {
          ...state.player.stats,
          energy: Math.min(100, state.player.stats.energy + energyRecovery),
          health: Math.min(100, state.player.stats.health + sleepHours)
        }
      },
      time: {
        ...state.time,
        currentHour: 6,
        currentMinute: 0
      }
    });
  }

  resetWeeklyTasks(): void {
    this.updateState(state => ({
      ...state,
      tasks: state.tasks.map(task => ({
        ...task,
        completedThisWeek: 0
      }))
    }));
  }

  getTasksForRoom(roomType: RoomType): Task[] {
    return this.tasks().filter(t => t.roomType === roomType || t.roomType === null);
  }

  canPerformTask(task: Task): boolean {
    const player = this.player();
    if (!player) return false;
    
    for (const req of task.requirements) {
      if (player.stats[req.stat] < req.minValue) {
        return false;
      }
    }
    
    return true;
  }

  private updateState(updater: (state: GameState) => GameState): void {
    const current = this._gameState();
    if (current) {
      this._gameState.set(updater(current));
    }
  }
}
