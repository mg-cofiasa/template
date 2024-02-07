import { Component } from '@angular/core';
import { InfoUsuario } from 'src/app/auth/interfaces/token-response';

import { TokenService } from 'src/app/auth/services/token.service';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.scss']
})
export class MainSidebarComponent {
  public infoUsuario: InfoUsuario = <InfoUsuario>{};
  
  constructor(private tokenService: TokenService){
    this.ObtenerInfoUsuario();
  }

  public ObtenerInfoUsuario(){
    this.infoUsuario = this.tokenService.ObtenerInfoUsuario();
    if (this.infoUsuario.Nombre.indexOf("(")){
      this.infoUsuario.Nombre = this.infoUsuario.Nombre.substring(this.infoUsuario.Nombre.indexOf("(") + 1, this.infoUsuario.Nombre.indexOf(")"));
    }

    if (this.infoUsuario.Nombre.length > 20){
      let nombreSegmentado = this.infoUsuario.Nombre.split("");
      this.infoUsuario.Nombre = nombreSegmentado[0] + " " + nombreSegmentado[1];
    }
  }
}