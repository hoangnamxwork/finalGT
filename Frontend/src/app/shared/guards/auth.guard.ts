import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toast = inject(NgToastService);
  if (auth.isSignedin()) return true;
  else {
    toast.error({
      detail: 'ERROR',
      summary: 'Hãy đăng nhập trước!',
      duration: 3000,
    });
    router.navigate(['/welcome']);
    return false;
  }
};
