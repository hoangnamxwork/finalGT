import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../../shared/archived/validateForm';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { UserDataService } from 'src/app/shared/services/user-data/user-data.service';

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
  role: string = '';
  hide = true;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: NgToastService,
    private userData: UserDataService,
    private route: Router
  ) {}

  onSignIn() {
    if (this.signinForm.valid) {
      this.auth.SignIn(this.signinForm.value).subscribe({
        next: (res) => {
          this.auth.storeAuthToken(res.token);
          let tokenPayLoad = this.auth.decodedToken(); 
          this.userData.setFullName(tokenPayLoad.unique_name);
          this.userData.setUserID(tokenPayLoad.nameid);
          this.userData.setRole(tokenPayLoad.Role);
          this.userData.getRole().subscribe((val) => {
            const rolefromToken = this.auth.getRoleFromToken();
            this.role = val || rolefromToken;
          });
          if (this.role) {
            if (this.role === 'Student') {
              this.route.navigate(['home']);
            } else if (this.role === 'Admin') {
              this.route.navigate(['admin']);
            }
          }
          this.toast.success({
            detail: 'THÀNH CÔNG',
            summary: 'Đăng nhập thành công!',
            duration: 4000,
          });
          this.signinForm.reset();
        },
        error: (err) => {
          console.log(err);
          this.toast.error({
            detail: 'LỖI',
            summary: 'Có gì đó đã bị lỗi!',
            duration: 4000,
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
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
