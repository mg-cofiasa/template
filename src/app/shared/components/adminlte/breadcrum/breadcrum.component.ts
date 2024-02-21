import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { breadcrum } from 'src/app/shared/interfaces/shared';

import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-breadcrum',
  templateUrl: './breadcrum.component.html',
  styleUrl: './breadcrum.component.scss'
})
export class BreadcrumComponent implements OnDestroy {
  public breadcrum: breadcrum = <breadcrum>{};
  public subscription: Subscription;

  constructor(private dataService: DataService){
    this.subscription = this.dataService.opcionSeleccionada$.subscribe((data: breadcrum) => {
      this.breadcrum.seccion = data.seccion;
      this.breadcrum.nivel01 = data.nivel01;
      this.breadcrum.nivel02 = data.nivel02;
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}