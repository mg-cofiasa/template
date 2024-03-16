import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  
})
export class MainHeaderComponent {
  public urlMedia: string = environment.urlMedia;
  public mostrarVentanaCerrarsesion: boolean = false;
  public urlFoto: string = environment.urlFoto;

  constructor() {
  }
}
