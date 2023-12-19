import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminQuizService {
  private baseUrl:string = "https://localhost:7030/api/Quiz/"

  constructor(private http: HttpClient) { }

  GetAllQuizes(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}DTO`);
  }

  AddQuiz(data: any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}DTO`, data);
  }

  EditQuiz(id:number, data:any){
    return this.http.put(`${this.baseUrl}DTO/${id}`, data);
  }
  
  DeleteQuiz(id:number):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}${id}`);
  }
}
