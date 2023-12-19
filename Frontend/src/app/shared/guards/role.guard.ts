import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../services/auth/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const toast = inject(NgToastService);
  const router = inject(Router);
  var payLoad = JSON.parse(window.atob(auth.getAuthToken()!.split('.')[1]));
  let role = payLoad.Role;
  if (role == "Admin") {
    return true;
  }
  else {
    toast.error({
      detail: 'ERROR',
      summary: 'Bạn không được phép vào trang này!',
      duration: 3000,
    });
    return false;
  }
};
