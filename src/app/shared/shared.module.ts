import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContentWrapperComponent } from './components/adminlte/content-wrapper/content-wrapper.component';
import { ControlSidebarComponent } from './components/adminlte/control-sidebar/control-sidebar.component';
import { MainHeaderComponent } from './components/adminlte/main-header/main-header.component';
import { MainFooterComponent } from './components/adminlte/main-footer/main-footer.component';
import { MainSidebarComponent } from './components/adminlte/main-sidebar/main-sidebar.component';

@NgModule({
  declarations: [
    ContentWrapperComponent,
    ControlSidebarComponent,
    MainHeaderComponent,
    MainFooterComponent,
    MainSidebarComponent
  ],
  exports:[
    ContentWrapperComponent,
    ControlSidebarComponent,
    MainHeaderComponent,
    MainFooterComponent,
    MainSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }

