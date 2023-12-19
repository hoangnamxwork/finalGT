import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomodoroQuizComponent } from './pomodoro-quiz.component';

describe('PomodoroQuizComponent', () => {
  let component: PomodoroQuizComponent;
  let fixture: ComponentFixture<PomodoroQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PomodoroQuizComponent]
    });
    fixture = TestBed.createComponent(PomodoroQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
