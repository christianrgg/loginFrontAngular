import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

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
    // 17. Crear constante donde del formulario se extraigan el email y pasword
    const {email, password} = this.myForm.value;
    // 18. Llamar al servicio login, y pasar los datos del paso anterior
    this.authService.login(email, password).subscribe(success =>{
      console.log({success})
    })
  }
}
