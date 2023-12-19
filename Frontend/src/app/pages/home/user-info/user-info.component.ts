import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AdminStudentService } from 'src/app/shared/services/admin/admin-student/admin-student.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent {
  fieldRequired: string = 'Dòng này yêu cầu nhập thông tin';
  editUserForm!: FormGroup;
  emailregex: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  hide = true;
  userData: any;
  payLoad: any;
  constructor(
    private toast: NgToastService,
    public user: AdminStudentService,
    public auth: AuthService,
    private fb: FormBuilder,
    private route: Router
  ) {
    this.editUserForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailregex)]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, this.checkPassword]],
    });
  }
  ngOnInit() {
    this.payLoad = JSON.parse(
      window.atob(this.auth.getAuthToken()!.split('.')[1])
    );
    this.payLoad.firstName = this.auth.getfirstNameFromToken();
    this.payLoad.lastName = this.auth.getlastNameFromToken();
    this.payLoad.email = this.auth.getEmailFromToken();
    this.payLoad.userName = this.auth.getUserNamefromToken();
    this.payLoad.password = this.auth.getPasswordfromToken();
    this.editUserForm.patchValue(this.payLoad);
  }

  OnEditUser() {
    if (this.editUserForm.valid) {
      if (this.payLoad) {
        this.user
          .EditUser(this.payLoad.nameid, this.editUserForm.value)
          .subscribe({
            next: (res: any) => {
              this.toast.success({
                detail: 'THÀNH CÔNG',
                summary: 'Sửa thông tin thành công!',
                duration: 4000,
              });
              if (this.payLoad.Role === 'Student') {
                this.route.navigate(['home']);
              } else if (this.payLoad.Role === 'Admin') {
                this.route.navigate(['admin']);
              }
            },
            error: (res: any) => {
              this.toast.error({
                detail: 'LỖI',
                summary: 'Có gì đó bị lỗi!',
                duration: 4000,
              });
            },
          });
      }
    }
  }

  Cancel() {
    if (this.payLoad.Role === 'Student') {
      this.route.navigate(['home']);
    } else if (this.payLoad.Role === 'Admin') {
      this.route.navigate(['admin']);
    }
  }
  ///

  emailErrors() {
    return this.editUserForm.get('Email')!.hasError('required')
      ? 'Dòng này yêu cầu nhập thông tin'
      : this.editUserForm.get('Email')!.hasError('pattern')
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
    return this.editUserForm.get('Password')!.hasError('required')
      ? 'Dòng này yêu cầu nhập thông tin (Mật khẩu phải chứa ít nhất sáu ký tự, một chữ cái in hoa và một số).'
      : this.editUserForm.get('Password')!.hasError('requirements')
      ? 'Mật khẩu cần ít nhất là sáu ký tự, bao gồm ít nhất một chữ cái in hoa và một chữ số.'
      : '';
  }
  checkValidation(input: string) {
    const validation =
      this.editUserForm.get(input)!.invalid &&
      (this.editUserForm.get(input)!.dirty ||
        this.editUserForm.get(input)!.touched);
    return validation;
  }
}
