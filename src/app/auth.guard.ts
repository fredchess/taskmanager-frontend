import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { AuthService } from './services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.getIsAuthenticated().pipe(
    map((user) => {
      if (route.routeConfig?.path === 'login' || route.routeConfig?.path === 'register') {
        return router.createUrlTree(['/projects']);
      }
      return true;
    }),
    catchError((err) => {
      if (route.routeConfig?.path === 'login' || route.routeConfig?.path === 'register') {
        return of(true);
      }
      return of(router.createUrlTree(['/login']));
    })
  );
};
