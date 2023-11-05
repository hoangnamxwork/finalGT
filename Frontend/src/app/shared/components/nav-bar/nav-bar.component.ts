import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserDataService } from '../../services/user-data/user-data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  public fullName: string = '';
  public isLoggedIn: boolean = false;

  constructor(private auth: AuthService, private userData: UserDataService) {}
  ngOnInit() {

  }

  onLogOut() {

    this.auth.LogOut();
  }
}
