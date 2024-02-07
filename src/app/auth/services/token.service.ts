import { Injectable } from '@angular/core';
import { TokenResponse, TokenPayload, InfoUsuario } from '../interfaces/token-response';
//import { TokenResponse } from '../responses/token-response';
//import { UserService } from './user.service';
import { jwtDecode } from "jwt-decode";
import { ReturnStatement } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(/* private userService: UserService */) {
  }

  /**
   * Comentario: Guarda la sesion
   */  
  saveSession(tokenResponse: TokenResponse[]) {
/*     let acceso = {
      "accessToken": tokenResponse.accessToken,
      "userId": tokenResponse.userId,
      "name": tokenResponse.name,
      "anp": tokenResponse.anp,
      "regional": tokenResponse.regional,
      "rol": tokenResponse.rol,
      "job": tokenResponse.job
    }; */

    localStorage.setItem('UserAccessTokenMain', tokenResponse[0].TokenValue);
  }


  /**
   * Comentario: Cierra la sesion
   */  
  logout() {
    localStorage.removeItem("UserAccessTokenMain");
  }  

  /**
   * Comentario: Revisa si existe información en el localstorage y obtiene...
   */
  getSession(): TokenPayload | null {
    if (localStorage.getItem('UserAccessTokenMain')) {
      let tokenPayload: TokenPayload = jwtDecode(localStorage.getItem('UserAccessTokenMain')!);

      return tokenPayload;
    }
    return null;
  }

  /**
   * Comentario: Revisa la sesion
   */  
  public isLoggedIn(): boolean {
    let tokenPayload: TokenPayload | null = this.getSession();
    
    if (!tokenPayload) {
      return false;
    }


    if(tokenPayload.exp){
      let tiempoToken = new Date(tokenPayload.exp * 1000);
      let tiempoAhora = new Date();

      return !(tiempoAhora > tiempoToken);
    }
    else{
      return false;
    }
  }

/*   refreshToken(session: TokenResponse): Observable<TokenResponse> {
    return this.userService.refreshToken(session);
  }   */

  /**
   * Comentario: 
   */
  public ObtenerInfoUsuario(): InfoUsuario{
    let tokenPayload: TokenPayload = <TokenPayload>{};

    if (localStorage.getItem("UserAccessTokenMain")){
      let tokenString = localStorage.getItem("UserAccessTokenMain");
      tokenPayload = jwtDecode(tokenString!);
    }

    return JSON.parse(tokenPayload.InfoUsuario);
  }

  /**
   * Comentario: 
   */
  public CerrarSesion(){
    localStorage.clear();
    window.location.reload();
  }
}
