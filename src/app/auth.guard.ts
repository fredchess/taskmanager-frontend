import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { inject } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginService = inject(LoginService);

  return loginService.getIsAuthenticated().pipe(map(user => {
    if (route.routeConfig?.path === 'login') {
      return router.createUrlTree(['/projects']);
    }
    return true;
  }), 
    catchError(err => {
      return of(router.createUrlTree(['/login']));
    })
  )
};
