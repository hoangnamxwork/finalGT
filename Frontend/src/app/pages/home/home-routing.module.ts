import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { QuizComponent } from './quiz/quiz.component';
import { PomodoroComponent } from './pomodoro-page/pomodoro/pomodoro.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { PomodoroQuizComponent } from './pomodoro-page/pomodoro-quiz/pomodoro-quiz.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: 'pomodoro',
    component: PomodoroComponent,
  },
  {
    path: 'pomodoro-quiz',
    component: PomodoroQuizComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path:'user/:nameid',
    component:UserInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
