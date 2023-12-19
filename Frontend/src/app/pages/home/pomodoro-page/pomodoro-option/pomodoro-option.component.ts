import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pomodoro-option',
  templateUrl: './pomodoro-option.component.html',
  styleUrls: ['./pomodoro-option.component.css'],
})
export class PomodoroOptionComponent {
  constructor(
    public dialogRef: MatDialogRef<PomodoroOptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: Router
  ) {}
  onConfirm(): void {
    this.dialogRef.close(true);
    this.route.navigate(['/pomodoro-quiz']);
  }

  onDismiss(): void {
    this.dialogRef.close(true);
    this.route.navigate(['/pomodoro']);
  }
}
