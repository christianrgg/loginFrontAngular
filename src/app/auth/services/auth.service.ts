import {computed, inject, Injectable, signal} from '@angular/core';
import {environment} from "../../../environments/environments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of, tap, throwError} from "rxjs";
import {AuthStatus, LoginResponse, User} from "../interfaces";
import {CheckTokenResponse} from "../interfaces/check-token.response";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking)

  // AL MUNDO EXTERIOR
  public currentUser = computed(()=> this._currentUser())
  public authStatus = computed(()=> this._authStatus())

  constructor() { }

  login(email:string, password:string):Observable<boolean>{


    const url = `${this.baseUrl}/auth/login`;
    const body = {email, password};

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        tap(({user,token})=> {
          this._currentUser.set(user);
          this._authStatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', token);
          console.log({user,token})
        }),
        map(()=>true),
        catchError(err => throwError(() => err.error.message))
      );
  }

  // 27. Crear metodo para verificar token y al almacenarlo
  checkAuthStatus():Observable<boolean>{
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');
    if(!token) return of (false);

    // 28. Para pasar los valores en los headers
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    // 29. Retornar la petición hhtp con la interfaz correspondiente
    // 31. Comienza en ".pipe" es que hacer con la respuesta
    return this.http.get<CheckTokenResponse>(url, {headers})
      .pipe(
        map(({token, user})=>{
          this._currentUser.set(user);
          this._authStatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', token);
          return true;
        }),
        //error
        catchError(()=> {
          this._authStatus.set(AuthStatus.notAuthenticated)
          return of(false)
        })
      )

  }
}
