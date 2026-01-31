import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { GameService } from '../../services/game.service';
import { StatBar } from '../stat-bar/stat-bar';

@Component({
  selector: 'app-player-panel',
  imports: [StatBar],
  templateUrl: './player-panel.html',
  styleUrl: './player-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerPanel {
  private readonly gameService = inject(GameService);
  
  readonly player = this.gameService.player;
  
  getRoleDisplay(role: string): string {
    const roles: Record<string, string> = {
      'helper': 'Помощник',
      'teenager': 'Подросток',
      'adult': 'Взрослый',
      'parent': 'Родитель'
    };
    return roles[role] ?? role;
  }
  
  getGenderIcon(gender: string): string {
    return gender === 'male' ? 'bi-gender-male' : 'bi-gender-female';
  }
  
  getInterestIcon(interest: string): string {
    const icons: Record<string, string> = {
      'sport': 'bi-bicycle',
      'music': 'bi-music-note-beamed',
      'reading': 'bi-book',
      'cooking': 'bi-egg-fried',
      'gaming': 'bi-controller',
      'art': 'bi-palette'
    };
    return icons[interest] ?? 'bi-star';
  }
  
  getInterestLabel(interest: string): string {
    const labels: Record<string, string> = {
      'sport': 'Спорт',
      'music': 'Музыка',
      'reading': 'Чтение',
      'cooking': 'Кулинария',
      'gaming': 'Игры',
      'art': 'Искусство'
    };
    return labels[interest] ?? interest;
  }
}
