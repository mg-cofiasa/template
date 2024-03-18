import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { DataService } from 'src/app/shared/services/data.service';
import { UsuarioMenu, breadcrum } from 'src/app/shared/interfaces/shared';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.scss']
})
export class MainSidebarComponent {
  public menuLateral: UsuarioMenu[] = [];
  public breadcrum: breadcrum = <breadcrum>{};
  
  constructor(
    private dataService: DataService,
    private router: Router
    ){


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

  public Breadcrum(breadcrum: breadcrum){
    this.dataService.setOpcionSeleccionada(breadcrum);
  }
}