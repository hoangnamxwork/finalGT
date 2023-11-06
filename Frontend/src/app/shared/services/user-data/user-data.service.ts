import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private nameid$ = new BehaviorSubject<string>("");

  constructor() { }

  public getRole(){
    return this.role$.asObservable();
  }

  public setRole(role:string){
    return this.role$.next(role);
  }

  public getFullName(){
    return this.fullName$.asObservable();
  }

  public setFullName(fullname:string){
    return this.fullName$.next(fullname)
  }

  public getUserID(){
    return this.nameid$.asObservable();
  }
  public setUserID(nameid:string){
    return this.role$.next(nameid);
  }
}
