import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthClassGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot
  ): boolean {
    if (this.auth.isSignedin()) {
      let roles = next.data['permittedRoles'] as Array<string>;
      return true;
    } else {
      this.toast.error({
        detail: 'ERROR',
        summary: 'Hãy đăng nhập trước!',
        duration: 3000,
      });
      this.router.navigate(['/welcome']);
      return false;
    }
  }
}
