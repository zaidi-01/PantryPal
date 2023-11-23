import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { tap } from 'rxjs/operators';
import {
  ApplicationPaths,
  QueryParameterNames,
} from './api-authorization.constants';
import { AuthorizeService } from './authorize.service';

export const AuthGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authorizeService = inject(AuthorizeService);
  const router = inject(Router);

  return authorizeService.isAuthenticated().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(ApplicationPaths.LoginPathComponents, {
          queryParams: {
            [QueryParameterNames.ReturnUrl]: state.url,
          },
        });
      }
    })
  );
};
