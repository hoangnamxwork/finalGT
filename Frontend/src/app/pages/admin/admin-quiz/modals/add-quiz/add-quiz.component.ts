import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { AddStudentComponent } from '../../../admin-student/modals/add-student/add-student.component';
import { AdminQuizService } from 'src/app/shared/services/admin/admin-quiz/admin-quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent {
  addQuizForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private quizService: AdminQuizService,
    private toast: NgToastService
  ) {
    this.addQuizForm = this.fb.group({
      quizContent: [''],
      subjectID: [''],
      option1: [''],
      option2: [''],
      option3: [''],
      option4: [''],
      answer: [''],
    });
  }

  onAddQuizSubmit() {
    if (this.addQuizForm.valid) {
      this.quizService.AddQuiz(this.addQuizForm.value).subscribe({
        next: (res) => {
          this.toast.success({
            detail: 'THÀNH CÔNG',
            summary: 'Thêm câu hỏi thành công!',
            duration: 4000,
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.log(err);
          alert(err.error.message);
        },
      });
    }
  }
}
