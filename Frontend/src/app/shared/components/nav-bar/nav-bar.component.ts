import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  public fullName = '';
  public nameid = '';
  constructor(public auth: AuthService) {
    if (this.auth.isSignedin()) {
      this.nameid = this.auth.getUserIDfromToken();
    }
  }

  onLogOut() {
    localStorage.clear();
    this.auth.LogOut();
  }
}
