import {User} from "./user.interface";

// 12. Copiar la respuesta de posmatn post de http://localhost:3000/auth/login pegarla en quicktipye y pegarla aqui
export interface LoginResponse {
  user:  User;
  token: string;
}
