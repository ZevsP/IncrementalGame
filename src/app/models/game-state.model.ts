/**
 * Game state model for the Incremental Game
 */

import { Player } from './player.model';
import { Room, RoomType } from './room.model';
import { Task } from './task.model';

export interface GameTime {
  currentHour: number;       // 0-23
  currentMinute: number;     // 0-59
  currentDay: number;        // 1-30
  currentWeek: number;       // 1-4
  currentMonth: number;      // month counter
  cycleSpeed: number;        // множитель скорости игры
}

export interface GameState {
  player: Player;
  rooms: Room[];
  tasks: Task[];
  time: GameTime;
  isRunning: boolean;
  isPaused: boolean;
  activeRoomId: string | null;
  activeTaskId: string | null;
  currentScene: 'setup' | 'game' | 'paused' | 'gameover';
}

export function createInitialGameTime(): GameTime {
  return {
    currentHour: 6,      // День начинается в 6:00
    currentMinute: 0,
    currentDay: 1,
    currentWeek: 1,
    currentMonth: 1,
    cycleSpeed: 1
  };
}

export function formatGameTime(time: GameTime): string {
  const hours = time.currentHour.toString().padStart(2, '0');
  const minutes = time.currentMinute.toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function getDayOfWeek(day: number): string {
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  return days[(day - 1) % 7];
}

export function getDayOfWeekFull(day: number): string {
  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
  return days[(day - 1) % 7];
}

export function isWeekend(day: number): boolean {
  const dayOfWeek = (day - 1) % 7;
  return dayOfWeek >= 5;
}
