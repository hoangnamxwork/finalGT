import { PomodoroOptionComponent } from './pomodoro-page/pomodoro-option/pomodoro-option.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public firstName = '';
  public lastName = '';
  constructor(public auth:AuthService,
    private dialog: MatDialog,
    private route:Router){
  }

  ngOnInit(){
    this.firstName = this.auth.getfirstNameFromToken();
    this.lastName = this.auth.getlastNameFromToken();
  }
  OpenSelectPomodoro(){
    const dialogRef = this.dialog.open(PomodoroOptionComponent);
}
}
