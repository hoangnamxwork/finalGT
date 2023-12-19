import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userPayload: any;
  private baseUrl: string = 'https://localhost:7030/api/Auth/';
  constructor(private http: HttpClient, private route: Router) {
    this.userPayload = this.decodedToken();
  }

  SignIn(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}SignIn`, userObj);
  }

  SignUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}SignUp`, userObj);
  }

  LogOut() {
    localStorage.clear();
    this.route.navigate(['/welcome']);
  }

  storeAuthToken(tokenValue: string) {
    localStorage.setItem('AuthToken', tokenValue);
  }

  getAuthToken() {
    return localStorage.getItem('AuthToken');
  }

  isSignedin(): boolean {
    return !!localStorage.getItem('AuthToken');
  }
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getAuthToken()!;
    return jwtHelper.decodeToken(token);
  }

  getfirstNameFromToken() {
    if (this.userPayload) return this.userPayload.FirstName;
  }

  getlastNameFromToken() {
    if (this.userPayload) return this.userPayload.LastName;
  }

  getRoleFromToken() {
    if (this.userPayload) return this.userPayload.Role;
  }
  getEmailFromToken() {
    if (this.userPayload) return this.userPayload.Email;
  }
  getUserIDfromToken() {
    if (this.userPayload) {
      return this.userPayload.nameid;
    }
  }
  getUserNamefromToken() {
    if (this.userPayload) {
      return this.userPayload.UserName;
    }
  }
  getPasswordfromToken() {
    if (this.userPayload) {
      return this.userPayload.Password;
    }
  }
}
