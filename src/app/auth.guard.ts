import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginService = inject(LoginService);

  return loginService.getIsAuthenticated().pipe(map(user => {
    if (!user) {
      return router.createUrlTree(['/login']);
    } else {
      return true;
    }
  }))
};
