import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent {

  public minutes: number = 25;
  public seconds: number = 0;
  private timer: any;
  private date = new Date();
  
  public show: boolean = true;
  public disabled: boolean = false;

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  updateTimer() {

    this.date.setMinutes(this.minutes);
    this.date.setSeconds(this.seconds);
    this.date.setMilliseconds(0);
    const time = this.date.getTime();
    this.date.setTime(time - 1000);  //---


    this.minutes = this.date.getMinutes();
    this.seconds = this.date.getSeconds();

    if (
      this.date.getMinutes() === 0 &&
      this.date.getSeconds() === 0) {
      //stop interval
      clearInterval(this.timer);

      setTimeout(() => {
        this.stop();
      }, 5000);

    }
  }

  start(){
    if (this.minutes > 0 || this.seconds > 0) {

      this.disabled = true;
      this.show = false;
      this.updateTimer();

      if(this.seconds > 0){
        this.timer = setInterval(() => {
          this.updateTimer();
        }, 1000);
      }     
    }
  }
  
  stop(){
    this.disabled = false;
    this.show = true;
    clearInterval(this.timer);
  }

  reset(){

    this.minutes = 25;
    this.seconds = 0;
    this.stop();
  }

  cancel(){
    this.route.navigate(["home"]);
  }

}

