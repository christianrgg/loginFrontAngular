import {computed, inject, Injectable, signal} from '@angular/core';
import {environment} from "../../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {map, Observable, of, tap} from "rxjs";
import {AuthStatus, LoginResponse, User} from "../interfaces";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking)

  // 12. Hacer publico el _currentUser y _authStatus al exterior, es de esta forma para que no se pueda modificar.
  public currentUser = computed(()=> this._currentUser)
  public authStatus = computed(()=> this._authStatus)

  constructor() { }

  login(email:string, password:string):Observable<boolean>{

    // 13. Concatenar la ruta al endpoint
    const url = `${this.baseUrl}/auth/login`;
    // 14. Crear el cuerpo de la peticion
    const body = {email, password};

    // 15. Retornar la peticion post de tipo login response, despues hacer mdificaciones al flujo para que retorne un booleando, en la linea de abajo retorna un loginresponse y se espera un booleano
    return this.http.post<LoginResponse>(url, body)
      .pipe(
        tap(({user,token})=> {
          this._currentUser.set(user);
          this._authStatus.set(AuthStatus.authenticated);
          //16. Grabar el token en el localstorage
          localStorage.setItem('token', token);
          console.log({user,token})
        }),
        map(()=>true)
      )







    return of (true);
  }
}
