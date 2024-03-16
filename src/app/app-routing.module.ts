import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* import { NotFound404Component } from './shared/errores/not-found404/not-found404.component';
import { InternalServerError500Component } from './shared/errores/internal-server-error500/internal-server-error500.component';
import { AcuseCorreoComponent } from './shared/acuse-correo/acuse-correo.component';
import { LoginComponent } from './login/login.component'; */

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main'
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '**',
    redirectTo: '404'
  }
/*   {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ilicitos'
  },
  {
    path: 'ilicitos',
    loadChildren: () => import('./ilicitos/ilicitos.module').then(m => m.IlicitosModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule)
  },  
  {
    path: '404',
    component: NotFound404Component
  },
  {
    path: '500',
    component: InternalServerError500Component
  },
  {
    path: 'acuse/:id',
    component: AcuseCorreoComponent
  },  
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '404'
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
