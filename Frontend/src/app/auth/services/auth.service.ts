import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:7030/api/Auth/"
  constructor(private http : HttpClient, private route: Router) { }

  SignIn(userObj:any){
    return this.http.post<any>(`${this.baseUrl}SignIn`,userObj)

  }

  SignUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}SignUp`,userObj)
  }
}
