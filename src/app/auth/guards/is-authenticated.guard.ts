import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {AuthStatus} from "../interfaces";

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  // 26. Inyectar el servicio(es una señal) para saber si esta autenticado
  const authService = inject(AuthService);
  const router = inject(Router);

  // 27. Condicion para Guard de acuerdo a la señal
  if (authService.authStatus() === AuthStatus.authenticated) {
    return true
  }
  // 24. Crear la constante para la url donde se quiere ir
  //const url = state.url;
  //console.log({url})
  //25. Almacenar la ultima ruta autenticada
  //localStorage.setItem('url', url);
  router.navigateByUrl('/auth/login')
  return false
};
