import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { VentasComponent } from './ventas/ventas/ventas.component';
import { VentasSegmentoComponent } from './ventas/ventas-segmento/ventas-segmento.component';
import { VentasTendenciaComponent } from './ventas/ventas-tendencia/ventas-tendencia.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      //  canActivate: [AuthGuard]
      },
      {
        path: 'ventas',
        component: VentasComponent,
      //  canActivate: [AuthGuard]
      },
      {
        path: 'ventas-segmento',
        component: VentasSegmentoComponent,
      //  canActivate: [AuthGuard]
      },
      {
        path: 'ventas-tendencia',
        component: VentasTendenciaComponent,
      //  canActivate: [AuthGuard]
      }  
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class PagesRoutingModule { }