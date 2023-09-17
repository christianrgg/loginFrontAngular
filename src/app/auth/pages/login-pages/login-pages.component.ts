import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import Swal from 'sweetalert2'
import {Router} from "@angular/router";


@Component({
  templateUrl: './login-pages.component.html',
  styleUrls: ['./login-pages.component.css']
})
export class LoginPagesComponent {

  private fb = inject(FormBuilder)
  private authService = inject(AuthService);
  // 21. Injectar el router para que si esta bien redirija a dashboard
  private router = inject(Router)

  public myForm: FormGroup = this.fb.group({
    email:['chris@gmail.com',[Validators.required, Validators.email]],
    password:['123456',[Validators.required, Validators.minLength(6)]],
  })

  login(){
    const {email, password} = this.myForm.value;
    // 22. Hacer en next la redireccion a la ruta elejida
    this.authService.login(email, password).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (message) => {
        Swal.fire('Error', message, 'error')
      }
    })
  }
}
