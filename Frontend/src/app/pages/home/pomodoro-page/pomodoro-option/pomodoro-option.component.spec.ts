import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomodoroOptionComponent } from './pomodoro-option.component';

describe('PomodoroOptionComponent', () => {
  let component: PomodoroOptionComponent;
  let fixture: ComponentFixture<PomodoroOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PomodoroOptionComponent]
    });
    fixture = TestBed.createComponent(PomodoroOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
