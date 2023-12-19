import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/shared/models/user.model';
import { AdminStudentService } from 'src/app/shared/services/admin/admin-student/admin-student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css'],
})
export class EditStudentComponent {
  editUserForm!: FormGroup;
  roles: string[] = ['Admin', 'Student'];
  emailregex: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  fieldRequired: string = 'Dòng này yêu cầu nhập thông tin';
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userSerice: AdminStudentService,
    private toast: NgToastService,
    private activateroute: ActivatedRoute,
    private route: Router
  ) {
    this.editUserForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailregex)]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, this.checkPassword]],
      role: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.editUserForm.patchValue(this.data);
  }

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

  onEditStudentSubmit() {
    if (this.editUserForm.valid) {
      if (this.data) {
        this.userSerice
          .EditUser(this.data.userID, this.editUserForm.value)
          .subscribe({
            next: (res: any) => {
              this.toast.success({
                detail: 'THÀNH CÔNG',
                summary: 'Sửa thông tin học sinh thành công!',
                duration: 4000,
              });
              this.dialogRef.close(true);
              this.route.navigate(['admin/student']);
              this.userSerice.GetAllUsers();
            },
          });
      }
    }
  }
}
