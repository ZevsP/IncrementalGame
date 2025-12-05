import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSettingsView } from './game-settings-view';

describe('GameSettingsView', () => {
  let component: GameSettingsView;
  let fixture: ComponentFixture<GameSettingsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSettingsView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSettingsView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
