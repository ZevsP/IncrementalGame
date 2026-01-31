import { Routes } from '@angular/router';
import { MainMenuView } from './views/main-menu-view/main-menu-view';
import { GameBoardView } from './views/game-board-view/game-board-view';
import { GameSettingsView } from './views/game-settings-view/game-settings-view';
import { CharacterSetupView } from './views/character-setup-view/character-setup-view';

export const routes: Routes = [
    {
        path: '',
        component: MainMenuView
    },
    {
        path: 'setup',
        component: CharacterSetupView
    },
    {
        path: 'game',
        component: GameBoardView
    },
    {
        path: 'settings',
        component: GameSettingsView
    },
     {
        path: '**',
        redirectTo: ''
    },

];

