import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { QuizComponent } from '../Quiz/quiz.component';
import { PomodoroComponent } from '../pomodoro/pomodoro.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

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
    path: 'dashboard',
    component: DashboardComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
