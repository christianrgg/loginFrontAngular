// 30. Crear la interfaz para la respuesta de check-token viene de esta url http://localhost:3000/auth/login en posmant
import {User} from "./user.interface";

export interface CheckTokenResponse {
  user:  User;
  token: string;
}

