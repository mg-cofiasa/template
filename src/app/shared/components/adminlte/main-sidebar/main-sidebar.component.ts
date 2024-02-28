import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { DataService } from 'src/app/shared/services/data.service';
import { InfoUsuario } from 'src/app/auth/interfaces/token-response';
import { TokenService } from 'src/app/auth/services/token.service';
import { UsuarioMenu, breadcrum } from 'src/app/shared/interfaces/shared';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.scss']
})
export class MainSidebarComponent {
  public urlMedia: string = environment.urlMedia;
  public infoUsuario: InfoUsuario = <InfoUsuario>{};
  public menuLateral: UsuarioMenu[] = [];
  public breadcrum: breadcrum = <breadcrum>{};
  
  constructor(
    private dataService: DataService,
    private tokenService: TokenService,
    private router: Router,
    ){
    this.ObtenerInfoUsuario();

    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.menuLateral.forEach(menu => {
            menu.Menu.forEach(submenu => {
              submenu.Submenu.forEach(seccion => {
                if (seccion.Ruta!= undefined && seccion.Ruta.endsWith(this.router.url)){
                  this.breadcrum = {
                    seccion: seccion.Seccion,
                    nivel01: submenu.Contenedor,
                    nivel02: seccion.Seccion
                  };
                  this.Breadcrum(this.breadcrum);
                }
              })
            })
          })
        }
      }
    );    
  }

  public ObtenerInfoUsuario(){
    this.infoUsuario = this.tokenService.ObtenerInfoUsuario();

    this.menuLateral = JSON.parse(this.infoUsuario.Menu);

    if (this.infoUsuario.Nombre.indexOf("(")){
      this.infoUsuario.Nombre = this.infoUsuario.Nombre.substring(this.infoUsuario.Nombre.indexOf("(") + 1, this.infoUsuario.Nombre.indexOf(")"));
    }

    if (this.infoUsuario.Nombre.length > 20){
      let nombreSegmentado = this.infoUsuario.Nombre.split("");
      this.infoUsuario.Nombre = nombreSegmentado[0] + " " + nombreSegmentado[1];
    }
  }

  public Breadcrum(breadcrum: breadcrum){
    this.dataService.setOpcionSeleccionada(breadcrum);
  }

  /**
   * Comentario: Cierra la sesión actuañ
   */
  public CerrarSesion(){
    this.tokenService.CerrarSesion();
  }  
}