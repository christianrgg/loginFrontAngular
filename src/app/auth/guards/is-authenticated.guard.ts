import { CanActivateFn } from '@angular/router';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  console.log('isAutheticatedGuard')
  console.log({route, state})

  return true;
};
