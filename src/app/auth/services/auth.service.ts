import {inject, Injectable, signal} from '@angular/core';
import {environment} from "../../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 6. Declarar variable de solo lectura que almacene la URL y no se pueda modificar
  private readonly baseUrl: string = environment.baseUrl;
  //8. Inyectar el modlo http
  private http = inject(HttpClient);

  // 9. señal para notificar a los componentes de la aplicación cuando el usuario se logea
  private _currentUser = signal<User|null>(null);
  // 10 verificar el estado de autenticación
  private _authStatus = signal<AuthStatus>()



  constructor() { }

  // 11. Metodo login
  login(email:string, password:string):Observable<boolean>{
    return of (true);
  }
}
