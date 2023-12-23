import { Component } from '@angular/core';
import ValidateForm from '../../shared/archived/validateForm';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../shared/services/auth/auth.service';
import { WhiteSpace } from 'src/app/shared/whitespace.validator';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  type: string = 'password';
  showPass: boolean = false;
  signupForm!: FormGroup;
  emailregex: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  hide = true;
  fieldRequired: string = 'Dòng này yêu cầu nhập thông tin và không được phép có khoảng trắng';
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      FirstName: [
        '',
        [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)],
      ],
      LastName: [
        '',
        [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)],
      ],
      Email: ['', [Validators.required, Validators.pattern(this.emailregex)]],
      UserName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
          WhiteSpace.noSpaceAllowed,
        ],
      ],
      Password: [
        '',
        [Validators.required, this.checkPassword, WhiteSpace.noSpaceAllowed],
      ],
    });
  }

  emailErrors() {
    return this.signupForm.get('Email')!.hasError('required')
      ? 'Dòng này yêu cầu nhập thông tin'
      : this.signupForm.get('Email')!.hasError('pattern')
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
    return this.signupForm.get('Password')!.hasError('required')
      ? 'Dòng này yêu cầu nhập thông tin (Mật khẩu phải chứa ít nhất sáu ký tự, một chữ cái in hoa và một số).'
      : this.signupForm.get('Password')!.hasError('requirements')
      ? 'Mật khẩu cần ít nhất là sáu ký tự không dấu cách, bao gồm ít nhất một chữ cái in hoa và một chữ số.'
      : '';
  }
  checkValidation(input: string) {
    const validation =
      this.signupForm.get(input)!.invalid &&
      (this.signupForm.get(input)!.dirty ||
        this.signupForm.get(input)!.touched);
    return validation;
  }

  get m() {
    return this.signupForm.controls;
  }

  onSignUp() {
    if (this.signupForm.valid) {
      this.auth.SignUp(this.signupForm.value).subscribe({
        next: (res) => {
          this.signupForm.reset();
          this.router.navigate(['/login']);
          this.toast.success({
            detail: 'THÀNH CÔNG',
            summary: 'Đăng ký thành công!',
            duration: 4000,
          });
        },
        error: (err) => {
          console.log(err);
          alert(err.error.message);
        },
      });
    } else {
      //throw error
      ValidateForm.validateForm(this.signupForm);
    }
  }
}
