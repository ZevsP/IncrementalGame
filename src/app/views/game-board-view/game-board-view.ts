import { Component, inject, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';
import { GameHeader } from '../../components/game-header/game-header';
import { PlayerPanel } from '../../components/player-panel/player-panel';
import { RoomsPanel } from '../../components/rooms-panel/rooms-panel';
import { TaskList } from '../../components/task-list/task-list';

@Component({
  selector: 'app-game-board-view',
  imports: [RouterLink, GameHeader, PlayerPanel, RoomsPanel, TaskList],
  templateUrl: './game-board-view.html',
  styleUrl: './game-board-view.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardView implements OnInit, OnDestroy {
  private readonly gameService = inject(GameService);
  private readonly router = inject(Router);
  
  readonly gameState = this.gameService.gameState;
  readonly player = this.gameService.player;
  readonly isRunning = this.gameService.isRunning;
  
  ngOnInit(): void {
    // If no game is running, redirect to character setup
    if (!this.gameService.gameState()) {
      this.router.navigate(['/setup']);
    }
  }
  
  ngOnDestroy(): void {
    // Pause the game when leaving the view
    if (this.isRunning()) {
      this.gameService.pauseGame();
    }
  }
}
