import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminStudentService {

  private baseUrl:string = "https://localhost:7030/api/User/"
  constructor(private http: HttpClient) { }

  GetAllUsers(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}DTO`);
  }

  GetUser(id:string): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}DTO/${id}`);
  }

  AddUser(user: User): Observable<any>{
    return this.http.post(`${this.baseUrl}DTO`, user);
  }

  EditUser(id:string, data:any): Observable<any>{
    return this.http.put(`${this.baseUrl}DTO/${id}`, data);
  }

  DeleteUser(id:number): Observable<User>{
    return this.http.delete<User>(`${this.baseUrl}${id}`);
  }
}
