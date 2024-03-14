import { Component } from '@angular/core';
import { InfoCircleIcon } from 'primeng/icons/infocircle';
import { InfoUsuario, TokenPayload } from 'src/app/auth/interfaces/token-response';

import { TokenService } from 'src/app/auth/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  
})
export class MainHeaderComponent {
  public mostrarVentanaCerrarsesion: boolean = false;
  public urlFoto: string = environment.urlFoto;
  public infoUsuario: InfoUsuario = <InfoUsuario>{};

  constructor(
    private tokenService: TokenService
  ) {
    this.ObtenerInfoUsuario();
  }
  
  /**
   * Comentario: Cierra la sesión actuañ
   */
  public CerrarSesion(){
    this.tokenService.CerrarSesion();
  }

  public ObtenerInfoUsuario(){
    this.infoUsuario = this.tokenService.ObtenerInfoUsuario();
  }
}
