import { Component, inject, signal } from '@angular/core';
import { GameBoardView } from '../game-board-view/game-board-view';
import { MainMenuView } from '../main-menu-view/main-menu-view';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-settings-view',
  imports: [RouterLink, FormsModule],
  templateUrl: './game-settings-view.html',
  styleUrl: './game-settings-view.css',
})
export class GameSettingsView {

  difficultyLevel = signal<string>('Normal');
  storyMode = signal<string>('Light Mode');

  difficultyOptions = ['Easy', 'Normal', 'Hard'];
  storyModeOptions = ['Black Mode', 'White Mode', 'Gold Mode', 'Light Mode', 'Dark Mode'];

  location = inject(Location);

  GoBack() {
    this.location.back();
  }

  onDifficultyChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.difficultyLevel.set(target.value);
  }

  onStoryModeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.storyMode.set(target.value);
  }

}
