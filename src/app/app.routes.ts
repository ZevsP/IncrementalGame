import { Routes } from '@angular/router';
import { MainMenuView } from './views/main-menu-view/main-menu-view';
import { GameBoardView } from './views/game-board-view/game-board-view';
import { GameSettingsView } from './views/game-settings-view/game-settings-view';

export const routes: Routes = [
    {
        path: '',
        component: MainMenuView
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

