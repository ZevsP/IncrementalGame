import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Task, getSubcategoryIcon, getCategoryColor } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskList {
  private readonly gameService = inject(GameService);
  
  readonly activeRoom = this.gameService.activeRoom;
  readonly player = this.gameService.player;
  
  readonly availableTasks = computed(() => {
    const room = this.activeRoom();
    if (!room) return [];
    return this.gameService.getTasksForRoom(room.type);
  });
  
  readonly personalTasks = computed(() => 
    this.availableTasks().filter(t => t.category === 'personal')
  );
  
  readonly socialTasks = computed(() => 
    this.availableTasks().filter(t => t.category === 'social')
  );
  
  startTask(task: Task): void {
    if (this.canPerformTask(task)) {
      this.gameService.completeTask(task.id);
    }
  }
  
  canPerformTask(task: Task): boolean {
    return this.gameService.canPerformTask(task) && !task.completedToday;
  }
  
  getSubcategoryIcon(subcategory: string): string {
    return getSubcategoryIcon(subcategory as any);
  }
  
  getCategoryColor(category: string): string {
    return getCategoryColor(category as any);
  }
  
  getSubcategoryLabel(subcategory: string): string {
    const labels: Record<string, string> = {
      'hygiene': 'Гигиена',
      'food': 'Питание',
      'study': 'Учёба',
      'hobby': 'Хобби',
      'sport': 'Спорт',
      'sleep': 'Сон'
    };
    return labels[subcategory] ?? subcategory;
  }
  
  getTaskStatus(task: Task): string {
    if (task.completedToday) return 'Выполнено';
    if (!this.canPerformTask(task)) return 'Недоступно';
    return `${task.baseTime} мин`;
  }
  
  getTaskStatusClass(task: Task): string {
    if (task.completedToday) return 'completed';
    if (!this.canPerformTask(task)) return 'unavailable';
    return 'available';
  }
}
