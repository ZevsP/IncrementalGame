import { Component } from '@angular/core';
import { GameBoardView } from '../game-board-view/game-board-view';
import { GameSettingsView } from '../game-settings-view/game-settings-view';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-menu-view',
  imports: [RouterLink],
  templateUrl: './main-menu-view.html',
  styleUrl: './main-menu-view.css',
})
export class MainMenuView {

}
