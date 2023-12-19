import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public qns: any[] = [];
  public quizProgress: number = 0;
  public correctAnswerCount: number = 0;
  public score: number = 0;

  private baseUrl:string = "https://localhost:7030/api/Quiz/"
  constructor(private http : HttpClient) { }

  RandomSubjectQuiz(id:number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}RandomSubjectQuiz/${id}`);
  }

  PomodoroQuiz(id:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}GetPomodoroQuiz/${id}`);
  
}

  SubmitTestResult(data:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}PostTestResult`, data);
  }
}
