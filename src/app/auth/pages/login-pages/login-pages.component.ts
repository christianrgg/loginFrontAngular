import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import Swal from 'sweetalert2'


@Component({
  templateUrl: './login-pages.component.html',
  styleUrls: ['./login-pages.component.css']
})
export class LoginPagesComponent {

  private fb = inject(FormBuilder)
  // 16. Inyectar el servicio
  private authService = inject(AuthService);

  public myForm: FormGroup = this.fb.group({
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(6)]],
  })

  login(){
    const {email, password} = this.myForm.value;
    // 20. Hacer la instalación de https://sweetalert2.github.io/ para la alerta
    this.authService.login(email, password).subscribe({
      next: () => console.log('Todo bien'),
      error: (message) => {
        Swal.fire('Error', message, 'error')
      }
    })
  }
}
