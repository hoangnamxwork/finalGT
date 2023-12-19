import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { AdminStudentService } from 'src/app/shared/services/admin/admin-student/admin-student.service';
import { EditStudentComponent } from '../../../admin-student/modals/edit-student/edit-student.component';
import { Router } from '@angular/router';
import { AdminQuizService } from 'src/app/shared/services/admin/admin-quiz/admin-quiz.service';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css'],
})
export class EditQuizComponent {
  editQuizForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditQuizComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private quizService: AdminQuizService,
    private toast: NgToastService,
    private route: Router
  ) {
    this.editQuizForm = this.fb.group({
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
  ngOnInit(): void {
    this.editQuizForm.patchValue(this.data);
  }
  onEditQuizSubmit() {
    if (this.editQuizForm.valid) {
      const subjectID = parseInt(this.editQuizForm.get('subjectID')?.value);
      const quizDiffId = parseInt(this.editQuizForm.get('quizDiffId')?.value);
      this.editQuizForm.value.subjectID = subjectID;
      this.editQuizForm.value.quizDiffId = quizDiffId;
      if (this.data) {
        this.quizService
          .EditQuiz(this.data.quizID, this.editQuizForm.value)
          .subscribe({
            next: () => {
              this.toast.success({
                detail: 'THÀNH CÔNG',
                summary: 'Sửa thông tin câu hỏi thành công!',
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
}
