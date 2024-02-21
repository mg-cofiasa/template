import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from '../shared/prime-ng.module';

import { PagesRoutingModule } from './pages-routing.module';

import { HighchartsChartModule } from 'highcharts-angular';


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
    PagesRoutingModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule
  ]
})
export class PagesModule { }
