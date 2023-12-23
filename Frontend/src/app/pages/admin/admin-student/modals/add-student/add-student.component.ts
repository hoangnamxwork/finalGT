import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AdminStudentService } from 'src/app/shared/services/admin/admin-student/admin-student.service';
import { WhiteSpace } from 'src/app/shared/whitespace.validator';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent {
  addUserForm: FormGroup;
  roles: string[] = ['Admin', 'Student'];
  emailregex: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  fieldRequired: string = 'Dòng này yêu cầu nhập thông tin';
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userSerice: AdminStudentService,
    private toast: NgToastService,
    private route: Router
  ) {
    this.addUserForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailregex)]],
      userName: ['', [Validators.required, WhiteSpace.noSpaceAllowed]],
      password: ['', [Validators.required, this.checkPassword, WhiteSpace.noSpaceAllowed]],
      role: ['', Validators.required],
    });
  }

  emailErrors() {
    return this.addUserForm.get('Email')!.hasError('required')
      ? 'Dòng này yêu cầu nhập thông tin'
      : this.addUserForm.get('Email')!.hasError('pattern')
      ? 'Không phải là một email hợp lệ'
      : '';
  }

  checkPassword(control: any) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }
  getErrorPassword() {
    return this.addUserForm.get('Password')!.hasError('required')
      ? 'Dòng này yêu cầu nhập thông tin (Mật khẩu phải chứa ít nhất sáu ký tự, một chữ cái in hoa và một số).'
      : this.addUserForm.get('Password')!.hasError('requirements')
      ? 'Mật khẩu cần ít nhất là sáu ký tự, bao gồm ít nhất một chữ cái in hoa và một chữ số.'
      : '';
  }
  checkValidation(input: string) {
    const validation =
      this.addUserForm.get(input)!.invalid &&
      (this.addUserForm.get(input)!.dirty ||
        this.addUserForm.get(input)!.touched);
    return validation;
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
          this.route.navigate(['admin/student']);
          this.userSerice.GetAllUsers();
        },
        error: (err) => {
          console.log(err);
          alert(err.error.message);
        },
      });
    }
  }
}
