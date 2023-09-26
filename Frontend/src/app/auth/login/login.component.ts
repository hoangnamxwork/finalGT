import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../validateForm';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  signinForm!: FormGroup;
  showPass: boolean = false;
  type: string = 'password';
  eyeIcon: string = 'fa-eye-slash';

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService,
    private toast: NgToastService,
    private router: Router,) {}

  onSignIn() {
    if (this.signinForm.valid) {
      //Send the object to database
      this.auth.SignIn(this.signinForm.value).subscribe({
        next: (res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: res.message,
            duration: 3000,
          });
          this.signinForm.reset();
          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          console.log(err);
          this.toast.error({
            detail: 'ERROR',
            summary: 'Something went wrong!',
            duration: 3000,
          });
        },
      });
    } else {
      //Throw a error
      ValidateForm.validateForm(this.signinForm);
    }
  }

  showPassword() {
    this.showPass = !this.showPass;
    this.showPass ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.showPass ? (this.type = 'text') : (this.type = 'password');
  }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
