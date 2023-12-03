import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { tap } from 'rxjs/operators';
import {
  ApplicationPaths as AuthApplicationPaths,
  QueryParameterNames,
} from './api-authorization.constants';
import { AuthorizeService } from './authorize.service';

/**
 * canActivate guard that checks if the user is authenticated.
 * If the user is not authenticated, it redirects to the login page with the return URL.
 * @param _route The activated route snapshot.
 * @param state The router state snapshot.
 * @returns An Observable that emits a boolean indicating whether the user is authenticated.
 */
export const authGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authorizeService = inject(AuthorizeService);
  const router = inject(Router);

  return authorizeService.isAuthenticated().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(AuthApplicationPaths.LoginPathComponents, {
          queryParams: {
            [QueryParameterNames.ReturnUrl]: state.url,
          },
        });
      }
    })
  );
};
