import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  templateUrl: './login-pages.component.html',
  styleUrls: ['./login-pages.component.css']
})
export class LoginPagesComponent {
  // 2. Inyectar el formbuilder
  private fb = inject(FormBuilder)

  // 3. Grupo con campos y validaciones
  public myForm: FormGroup = this.fb.group({
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(6)]],
  })

  // 4. Crear metodo
  login(){
    console.log(this.myForm.value)
  }
}
