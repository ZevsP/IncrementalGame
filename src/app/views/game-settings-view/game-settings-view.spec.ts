import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { GameSettingsView } from './game-settings-view';

describe('GameSettingsView', () => {
  let component: GameSettingsView;
  let fixture: ComponentFixture<GameSettingsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSettingsView],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSettingsView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default difficulty level set to Normal', () => {
    expect(component.difficultyLevel()).toBe('Normal');
  });

  it('should have default story mode set to Light Mode', () => {
    expect(component.storyMode()).toBe('Light Mode');
  });

  it('should update difficulty level when changed', () => {
    const event = { target: { value: 'Hard' } } as unknown as Event;
    component.onDifficultyChange(event);
    expect(component.difficultyLevel()).toBe('Hard');
  });

  it('should update story mode when changed', () => {
    const event = { target: { value: 'Dark Mode' } } as unknown as Event;
    component.onStoryModeChange(event);
    expect(component.storyMode()).toBe('Dark Mode');
  });

  it('should have all difficulty options', () => {
    expect(component.difficultyOptions).toEqual(['Easy', 'Normal', 'Hard']);
  });

  it('should have all story mode options', () => {
    expect(component.storyModeOptions).toEqual([
      'Black Mode',
      'White Mode',
      'Gold Mode',
      'Light Mode',
      'Dark Mode'
    ]);
  });
});
