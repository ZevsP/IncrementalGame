import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MainMenuView } from './main-menu-view';

describe('MainMenuView', () => {
  let component: MainMenuView;
  let fixture: ComponentFixture<MainMenuView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainMenuView],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainMenuView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
