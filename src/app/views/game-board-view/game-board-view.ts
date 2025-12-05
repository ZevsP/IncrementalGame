import { Component } from '@angular/core';
import { GameSettingsView } from '../game-settings-view/game-settings-view';
import { MainMenuView } from '../main-menu-view/main-menu-view';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-board-view',
  imports: [RouterLink],
  templateUrl: './game-board-view.html',
  styleUrl: './game-board-view.css',
})
export class GameBoardView {

}
