import { Component, inject } from '@angular/core';
import { GameBoardView } from '../game-board-view/game-board-view';
import { MainMenuView } from '../main-menu-view/main-menu-view';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-game-settings-view',
  imports: [RouterLink],
  templateUrl: './game-settings-view.html',
  styleUrl: './game-settings-view.css',
})
export class GameSettingsView {

  location = inject(Location);

  GoBack() {
    this.location.back();
  } 

}
