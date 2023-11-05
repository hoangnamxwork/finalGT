import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from 'src/app/auth/validateForm';
import { AdminStudentService } from 'src/app/shared/services/admin/admin-student/admin-student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent {
  addUserForm: FormGroup;
  roles: string[] = ['Admin', 'Student'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userSerice: AdminStudentService,
    private toast: NgToastService
  ) {
    this.addUserForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      userName: [''],
      password: [''],
      role: [''],
    });
  }

  onAddStudentSubmit() {
    if (this.addUserForm.valid) {
      this.userSerice.AddUser(this.addUserForm.value).subscribe({
        next: (res) => {
          this.toast.success({
            detail: 'THÀNH CÔNG',
            summary: 'Thêm học sinh thành công!',
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
