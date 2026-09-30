import { CanDeactivateFn } from '@angular/router';

/** Fail closed until the corresponding policy is implemented. Not registered yet. */
export const pendingOrderGuard: CanDeactivateFn<unknown> = () => false;
