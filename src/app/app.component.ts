import {Component, computed, effect, inject} from '@angular/core';
import {AuthService} from "./auth/services/auth.service";
import {AuthStatus} from "./auth/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // 33. Inyectar el servicio
  private authService = inject(AuthService);
  private router = inject(Router)
  // Señal para detectar estado de autenticación
  public finishedAuthCheck = computed<boolean>(()=>{
    if(this.authService.authStatus() === AuthStatus.checking){
      return false;
    }
    return true;
  });

  // 35. Disparar efecto
  public authStatusChangedEffect= effect(()=>{
    // 38.
    switch (this.authService.authStatus()){
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;
    }
    this.authService.authStatus()

})
}
