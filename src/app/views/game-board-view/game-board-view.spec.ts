import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { GameBoardView } from './game-board-view';
import { GameService } from '../../services/game.service';

describe('GameBoardView', () => {
  let component: GameBoardView;
  let fixture: ComponentFixture<GameBoardView>;
  let gameService: GameService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBoardView],
      providers: [
        provideRouter([
          { path: 'setup', component: GameBoardView },
          { path: 'game', component: GameBoardView }
        ])
      ]
    })
    .compileComponents();

    gameService = TestBed.inject(GameService);
    router = TestBed.inject(Router);
    
    fixture = TestBed.createComponent(GameBoardView);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should display game content when game is running', async () => {
    // Initialize the game
    gameService.initializeGame('Test Player', 'male', 15, ['sport']);
    gameService.startGame();
    
    fixture.detectChanges();
    await fixture.whenStable();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.game-layout')).toBeTruthy();
  });
});
