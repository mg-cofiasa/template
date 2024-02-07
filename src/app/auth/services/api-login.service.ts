import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TokenService } from './token.service';

import { environment } from 'src/environments/environment';
import { TokenResponse } from '../interfaces/token-response';
import { LoginRequest } from '../interfaces/login';
//import { Respuesta } from '../models/Respuesta';
//import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {
  private apiUrl: string = environment.apiUrl + 'Usuario';
  private url: string = this.apiUrl;
  public session: TokenResponse = JSON.parse(localStorage.getItem("UserAccess") + "");

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  /**
   * 
   * @param parametro 
   * @returns {{exito: boolean, mensaje: string, datos: any}}
   */
  postLogin(parametro: LoginRequest): Observable<TokenResponse[]>{
    return this.http.post<TokenResponse[]>(`${this.url}/Login`, parametro);
  }

  /**
   * 
   * @param parametro 
   * @returns {{exito: boolean, mensaje: string, datos: any}}
   */
  postRefreshToken(session: TokenResponse): Observable<TokenResponse>{
    let refreshTokenRequest: any = {
/*       UserId: session.userId,
      AccessToken: session.accessToken */
    };
    return this.http.post<TokenResponse>(`${this.url}/RefreshToken`, JSON.stringify(refreshTokenRequest));
  }

  /**
   * 
   * @param parametro 
   * @returns {{exito: boolean, mensaje: string, datos: any}}
   */
/*   postHistorialAccion(parametro: any): Observable<Respuesta>{
    return this.http.post<Respuesta>(`${this.url}/HistorialAccion`, JSON.stringify(parametro));
  }  

  logout(): void {
    this.tokenService.logout();
    return;
  } */

  /**
   * Comentario: Sale de la aplicacion
   */
   f_cerrarSesion(){
/*    Swal.fire({
      title: 'Confirmar cierre de sesión',
      html: '',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Comentario: Modal indicando que se esta cerrando sesion
        Swal.fire({
          icon: 'info',
          title: 'Cerrando sesión',
          html: '<div class="text-secondary">Se está cerrando la sesión, por favor, esperar un momento...</div>',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false,
          footer: '<span class="loader"></span>'
        });
        
        let registrar = {
          IdUsuario: this.session.userId,
          IdAccion: 16,
          Referencia: '-',
          ValorAnterior: '-',
          ValorPosterior: '-',
        }
        this.postHistorialAccion(registrar).subscribe(()=>{
          Swal.close();
          this.logout();
          window.location.reload();
        });
      }
    });*/
  }    
}