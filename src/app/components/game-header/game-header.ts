import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { GameService } from '../../services/game.service';
import { formatGameTime, getDayOfWeek } from '../../models/game-state.model';

@Component({
  selector: 'app-game-header',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './game-header.html',
  styleUrl: './game-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameHeader {
  private readonly gameService = inject(GameService);
  
  readonly time = this.gameService.time;
  readonly isRunning = this.gameService.isRunning;
  readonly isPaused = this.gameService.isPaused;
  readonly player = this.gameService.player;
  
  get formattedTime(): string {
    const t = this.time();
    return t ? formatGameTime(t) : '--:--';
  }
  
  get dayOfWeek(): string {
    const t = this.time();
    return t ? getDayOfWeek(t.currentDay) : '--';
  }
  
  get dayInfo(): string {
    const t = this.time();
    if (!t) return '';
    return `День ${t.currentDay}, Неделя ${t.currentWeek}`;
  }
  
  togglePause(): void {
    if (this.isPaused()) {
      this.gameService.resumeGame();
    } else {
      this.gameService.pauseGame();
    }
  }
  
  setSpeed(speed: number): void {
    this.gameService.setGameSpeed(speed);
  }
  
  getCurrentSpeed(): number {
    return this.time()?.cycleSpeed ?? 1;
  }
}
