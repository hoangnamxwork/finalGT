import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminSubjectService {

  private baseUrl:string = "https://localhost:7030/api/Subject/"
  constructor(private http: HttpClient) { }

  GetAllSubjects(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}DTO`);
  }
}
