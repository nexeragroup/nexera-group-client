import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';
import { AuthStore } from '../stores/auth.store';

export const activeShiftGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthStore);
  const router = inject(Router);

  const evaluate = (): true | UrlTree => {
    // -------------------------------------------------------------------------
    // User must be authenticated
    // -------------------------------------------------------------------------
    if (!auth.authenticated()) {
      return router.createUrlTree(['/auth/sign-in'], {
        queryParams: {
          returnUrl: state.url,
        },
      });
    }

    // -------------------------------------------------------------------------
    // User must have an active shift
    // -------------------------------------------------------------------------
    if (!auth.hasActiveShift()) {
      return router.createUrlTree(['/shift'], {
        queryParams: {
          returnUrl: state.url,
        },
      });
    }

    // -------------------------------------------------------------------------
    // Access granted
    // -------------------------------------------------------------------------å
    return true;
  };

  // Session has already been restored.
  if (auth.initialized()) {
    return evaluate();
  }

  // Wait for session restoration before making
  // an authorization decision.
  return toObservable(auth.initialized).pipe(
    filter((initialized) => initialized),
    take(1),
    map(() => evaluate()),
  );
};
