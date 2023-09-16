import {inject, Injectable, signal} from '@angular/core';
import {environment} from "../../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {AuthStatus, User} from "../interfaces";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 6. Declarar variable de solo lectura que almacene la URL y no se pueda modificar
  private readonly baseUrl: string = environment.baseUrl;

  private http = inject(HttpClient);

  // 16. Hacer la importación para user y para status. En estatus agregar que el valor inicial sea checking
  private _currentUser = signal<User|null>(null);

  private _authStatus = signal<AuthStatus>(AuthStatus.checking)



  constructor() { }

  login(email:string, password:string):Observable<boolean>{
    return of (true);
  }
}
