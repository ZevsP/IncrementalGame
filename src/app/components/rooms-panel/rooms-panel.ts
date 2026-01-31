import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Room, RoomType, getRoomSpecialAbilities } from '../../models/room.model';

@Component({
  selector: 'app-rooms-panel',
  imports: [],
  templateUrl: './rooms-panel.html',
  styleUrl: './rooms-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsPanel {
  private readonly gameService = inject(GameService);
  
  readonly rooms = this.gameService.rooms;
  readonly activeRoom = this.gameService.activeRoom;
  readonly unlockedRooms = this.gameService.unlockedRooms;
  
  selectRoom(room: Room): void {
    if (room.isUnlocked) {
      this.gameService.selectRoom(room.id);
    }
  }
  
  getRoomIcon(type: RoomType): string {
    const icons: Record<RoomType, string> = {
      kitchen: 'bi-cup-hot',
      living_room: 'bi-tv',
      bedroom: 'bi-moon-stars',
      hallway: 'bi-door-open',
      bathroom: 'bi-droplet',
      library: 'bi-book'
    };
    return icons[type];
  }
  
  getRoomAbilities(type: RoomType): string[] {
    return getRoomSpecialAbilities(type);
  }
  
  getAbilityLabel(ability: string): string {
    const labels: Record<string, string> = {
      'eat': 'Еда',
      'drink': 'Питьё',
      'cook': 'Готовка',
      'rest': 'Отдых',
      'entertainment': 'Развлечения',
      'socialize': 'Общение',
      'sleep': 'Сон',
      'change_clothes': 'Переодеться',
      'dress': 'Одеться',
      'leave_home': 'Выйти',
      'hygiene': 'Гигиена',
      'wash': 'Мытьё',
      'brush_teeth': 'Зубы',
      'study': 'Учёба',
      'read': 'Чтение',
      'board_games': 'Настолки',
      'music': 'Музыка'
    };
    return labels[ability] ?? ability;
  }
  
  calculateArea(room: Room): number {
    return room.dimensions.width * room.dimensions.length;
  }
}
