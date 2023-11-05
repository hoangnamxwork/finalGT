import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('LoginToken');  
  if(token == "true") {
    return true;
  } else {
    router.navigate(['welcome']);
    return false;
  }
  
};
