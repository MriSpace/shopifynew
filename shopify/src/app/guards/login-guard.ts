import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../common/services/auth';
import { inject } from '@angular/core';


export const loginGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router)

  if(auth.isLoggedIn()){
    router.navigate(['/home']);
    return false;
  }
  return true;
};
