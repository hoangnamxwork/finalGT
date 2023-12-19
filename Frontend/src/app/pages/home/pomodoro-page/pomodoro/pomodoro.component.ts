import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css'],
})
export class PomodoroComponent {
  public status!: string;
  public minutes: number = 25;
  public seconds: number = 0;
  private timer: any;
  private date = new Date();
  public isWorking: boolean = true;
  public isResting: boolean = false;
  public show: boolean = true;
  public disabled: boolean = false;

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.status = 'chưa bắt đầu sử dụng chế độ Pomodoro!';
  }

  updateTimer() {
    this.date.setMinutes(this.minutes);
    this.date.setSeconds(this.seconds);
    this.date.setMilliseconds(0);
    const time = this.date.getTime();
    this.date.setTime(time - 1000);

    this.minutes = this.date.getMinutes();
    this.seconds = this.date.getSeconds();

    if (this.date.getMinutes() === 0 && this.date.getSeconds() === 0) {
      this.isWorking = !this.isWorking;
      this.isResting = !this.isResting;
      if (this.isWorking == true) {
        this.minutes = 25;
        this.seconds = 0;
        this.status = 'trong chu kì làm việc! Hãy làm việc thật chăm chỉ nhé!';
      }
      if (this.isResting == true) {
        this.minutes = 5;
        this.seconds = 0;
        this.status = 'trong thời gian nghỉ ngơi! Hãy nghỉ ngơi một chút nha!';
      }
    }
  }

  start() {
    if (this.minutes > 0 || this.seconds > 0) {
      if (this.isWorking == true) {
        this.status = 'trong chu kì làm việc! Hãy làm việc thật chăm chỉ nhé!';
      } else if (this.isResting == true) {
        this.status = 'trong thời gian nghỉ ngơi! Hãy nghỉ ngơi một chút nha!';
      }
      this.disabled = true;
      this.show = false;
      this.updateTimer();

      if (this.seconds > 0) {
        this.timer = setInterval(() => {
          this.updateTimer();
        }, 1000);
      }
    }
  }

  stop() {
    this.disabled = false;
    this.show = true;
    clearInterval(this.timer);
    this.status = 'không sử dụng chế độ Pomodoro!';
  }

  reset() {
    this.minutes = 25;
    this.seconds = 0;
    this.stop();
  }

  cancel() {
    this.route.navigate(['home']);
  }
}
