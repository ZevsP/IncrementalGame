import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { GameBoardView } from './game-board-view';

describe('GameBoardView', () => {
  let component: GameBoardView;
  let fixture: ComponentFixture<GameBoardView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBoardView],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameBoardView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
