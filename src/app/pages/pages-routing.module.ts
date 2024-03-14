import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/services/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PermisosComponent } from './permisos/permisos.component';

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
        path: 'permisos',
        component: PermisosComponent,
      //  canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class PagesRoutingModule { }