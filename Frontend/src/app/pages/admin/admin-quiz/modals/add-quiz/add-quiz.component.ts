import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { AddStudentComponent } from '../../../admin-student/modals/add-student/add-student.component';
import { AdminQuizService } from 'src/app/shared/services/admin/admin-quiz/admin-quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent {
  addQuizForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddQuizComponent>,
    private quizService: AdminQuizService,
    private toast: NgToastService,
    private route: Router
  ) {
    this.addQuizForm = this.fb.group({
      quizContent: [''],
      subjectID: [''],
      option1: [''],
      option2: [''],
      option3: [''],
      option4: [''],
      answer: [''],
      quizDiffId: [''],
    });
  }



  onAddQuizSubmit() {
    if (this.addQuizForm.valid) {
      const subjectID = parseInt(this.addQuizForm.get('subjectID')?.value);
      const quizDiffId = parseInt(this.addQuizForm.get('quizDiffId')?.value);
      this.addQuizForm.value.subjectID = subjectID;
      this.addQuizForm.value.quizDiffId = quizDiffId;
      this.quizService.AddQuiz(this.addQuizForm.value).subscribe({       
        next: (res) => {
          this.toast.success({
            detail: 'THÀNH CÔNG',
            summary: 'Thêm câu hỏi thành công!',
            duration: 4000,
          });
          this.dialogRef.close(true);
          this.route.navigate(['admin/quiz']);
          this.quizService.GetAllQuizes();
        },
        error: (err) => {
          this.toast.error({
            detail: 'LỖI',
            summary: 'Có gì đó đã bị lỗi!',
            duration: 4000,
          });
        },
      });
    }
  }
}
