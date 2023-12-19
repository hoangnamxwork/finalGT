import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin-main/admin.component';
import { AdminStudentComponent } from './admin-student/admin-student.component';
import { AdminQuizComponent } from './admin-quiz/admin-quiz.component';
import { AdminHistoryComponent } from './admin-history/admin-history.component';
import { AdminSubjectComponent } from './admin-subject/admin-subject.component';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:'student',
        component:AdminStudentComponent
      },
      {
        path:'quiz',
        component:AdminQuizComponent
      },
      {
        path:'subject',
        component:AdminSubjectComponent
      },
      {
        path:'history',
        component:AdminHistoryComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
