import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNGModule } from '../shared/prime-ng.module';

import { PagesRoutingModule } from './pages-routing.module';

import { HighchartsChartModule } from 'highcharts-angular';


import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [
    DashboardComponent
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
