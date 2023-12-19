import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QuizComponent } from './quiz/quiz.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PomodoroComponent } from './pomodoro-page/pomodoro/pomodoro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserInfoComponent } from './user-info/user-info.component';
import { PomodoroOptionComponent } from './pomodoro-page/pomodoro-option/pomodoro-option.component';
import { PomodoroQuizComponent } from './pomodoro-page/pomodoro-quiz/pomodoro-quiz.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    HomeComponent,
    QuizComponent,
    PomodoroComponent,
    DashboardComponent,
    UserInfoComponent,
    PomodoroOptionComponent,
    PomodoroQuizComponent
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule, ReactiveFormsModule,NgChartsModule],
})
export class HomeModule {
}
