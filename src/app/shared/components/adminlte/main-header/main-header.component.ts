import { Component } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  
})
export class MainHeaderComponent {
  public mostrarVentanaCerrarsesion: boolean = false;
  
  constructor() {
  }
}
