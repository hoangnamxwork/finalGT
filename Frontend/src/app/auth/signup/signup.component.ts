import { Component } from '@angular/core';
import ValidateForm from '../validateForm';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  type: string = 'password';
  showPass: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth : AuthService, private router : Router,private toast: NgToastService) {}

  showPassword() {
    this.showPass = !this.showPass;
    this.showPass ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.showPass ? (this.type = 'text') : (this.type = 'password');
  }

  
  onSignUp(){
    if (this.signupForm.valid){
      this.auth.SignUp(this.signupForm.value).subscribe({
        next:(res)=>{
          this.signupForm.reset();
          this.router.navigate(['']);
          this.toast.success({detail:"SUCCESS", summary:"Sign up complete!", duration:3000});
        }
        ,
        error:(err => {
          console.log(err);
          alert(err.error.message);
        })
      })

    }else{
      //throw error
      ValidateForm.validateForm(this.signupForm);
    }
  }
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullname: ['', Validators.required],
      gender: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      age: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      level: ['', Validators.required],
    });
  }
}
