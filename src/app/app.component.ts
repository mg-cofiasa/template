import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from './auth/services/token.service';
import { jwtDecode } from "jwt-decode";

import { AppService } from './services/app.service';
import { Subscription } from 'rxjs';
import { InfoUsuario } from './auth/interfaces/token-response';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit, OnDestroy {
  public urlMedia: string = environment.urlMedia;
  public isLoggedIn: boolean = false;
  public infoUsuario: InfoUsuario = <InfoUsuario>{};

  private observableService$: Subscription = Subscription.EMPTY;

  constructor(
    private appService: AppService, 
    private router: Router,
    private tokenService: TokenService
  ){
    this.observableService$ = this.appService.templateLoginState.subscribe((loginState: boolean) =>{
      this.isLoggedIn = loginState;
    });

    let vs = localStorage.getItem('UserAccessTokenMain');

    if (!vs){
      this.logout();
      return;
    }

    let session = localStorage.getItem('UserAccessTokenMain');

    this.infoUsuario = this.tokenService.ObtenerInfoUsuario();
    if (session){
/*       let jwtObject: any = jwtDecode(session);

      if(jwtObject){
        let tiempoToken = new Date(jwtObject.exp * 1000);
        let tiempoAhora = new Date();
  
        if (tiempoAhora > tiempoToken){
          this.logout();
        }
        else{
          this.isLoggedIn = true;
        }
      }
      else{
        this.logout();
      } */
    }
    else{
      this.logout();
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  public logout(): void {
    //this.isLoggedIn = true;
    this.tokenService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.observableService$){
      this.observableService$.unsubscribe();
    }
  }  
}