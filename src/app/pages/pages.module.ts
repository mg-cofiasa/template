import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from '../shared/prime-ng.module';

import { PagesRoutingModule } from './pages-routing.module';

import { HighchartsChartModule } from 'highcharts-angular';

import { DxChartModule } from 'devextreme-angular';
import { DxSelectBoxModule } from 'devextreme-angular';
import { DxPieChartModule } from 'devextreme-angular';
/* import { NgxMapboxGLModule } from 'ngx-mapbox-gl'; */


import { DashboardComponent } from './dashboard/dashboard.component';
import { VentasSegmentoComponent } from './ventas/ventas-segmento/ventas-segmento.component';
import { VentasTendenciaComponent } from './ventas/ventas-tendencia/ventas-tendencia.component';
import { VentasComponent } from './ventas/ventas/ventas.component';

@NgModule({
  declarations: [
    DashboardComponent,
    VentasComponent,
    VentasSegmentoComponent,
    VentasTendenciaComponent
  ],
  imports: [
    CommonModule,
    DxChartModule,
    DxSelectBoxModule,
    DxPieChartModule,
    /* NgxMapboxGLModule, */
    PagesRoutingModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
/*     NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoibWlndWVsZ2FsdmFuIiwiYSI6ImNsc2NieXBtcTBudTkya3QwZDM5Y3BmaWQifQ.OIJNxMQ9vlYnZBrkk9HfQA', // Optional, can also be set per map (accessToken input of mgl-map)
    }) */
  ]
})
export class PagesModule { }
