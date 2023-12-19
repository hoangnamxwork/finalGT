import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminHistoryService {
  private baseUrl:string = "https://localhost:7030/api/TestResult/"

  constructor(private http: HttpClient) { 
  }
  GetAllTestResults(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}DTO`);
  }

}
