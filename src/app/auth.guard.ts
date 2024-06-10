import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { inject } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginService = inject(LoginService);
  let auth = false;

  return loginService.getIsAuthenticated().pipe(map(user => {
    return true
  }), 
    catchError(err => {
      return of(router.createUrlTree(['/login']));
    })
  )
};
