import {Component, computed, inject} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  //23 acceder a la información del usuario
  private authService = inject(AuthService);
  public user = computed(() => this.authService.currentUser());
  //get user(){
  //  return this._authService.currentUser();
  //}

  onLogout(){
    this.authService.logout();
  }
}

