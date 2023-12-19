import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin-main/admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminStudentComponent } from './admin-student/admin-student.component';
import { AdminQuizComponent } from './admin-quiz/admin-quiz.component';
import { AddStudentComponent } from './admin-student/modals/add-student/add-student.component';
import { EditStudentComponent } from './admin-student/modals/edit-student/edit-student.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { AddQuizComponent } from './admin-quiz/modals/add-quiz/add-quiz.component';
import { EditQuizComponent } from './admin-quiz/modals/edit-quiz/edit-quiz.component';
import { AdminSubjectComponent } from './admin-subject/admin-subject.component';
import { AdminHistoryComponent } from './admin-history/admin-history.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminStudentComponent,
    AdminQuizComponent,
    AddStudentComponent,
    EditStudentComponent,
    AddQuizComponent,
    EditQuizComponent,
    AdminSubjectComponent,
    AdminHistoryComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    
  ]
})
export class AdminModule { }
