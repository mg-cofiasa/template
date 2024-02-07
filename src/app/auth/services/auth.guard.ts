import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';


import { TokenResponse } from '../interfaces/token-response';

import { TokenService } from '../services/token.service';
import { ApiLoginService } from '../services/api-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router, 
    private tokenService: TokenService, 
    private ApiLogin: ApiLoginService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
/*     let session = this.tokenService.getSession(); // Revisa que la sesion exista
    if (session == null) {
      this.router.navigate(['/login']);
      return false;
    }

    if (this.tokenService.isLoggedIn()) { // Renueva el token
      return this.checkSession(session);
    }
    else{
      this.logout();
      return false;
    } */
    return true;
  }

  checkSession(session: TokenResponse): Observable<boolean> {
    return this.ApiLogin.postRefreshToken(session).pipe(
      map(data => {
        //console.log(`refreshToken repsonse is ${JSON.stringify(data)}`);
        //this.tokenService.saveSession(data);
        return true;
      }),
      catchError(() => {
        //console.log(`inside checkSession ${JSON.stringify(error)}`);
        this.router.navigate(['/login']);
        return EMPTY;
      })
    );
  }

  logout(){
    this.tokenService.logout();
    window.location.reload();
  }

/*   checkSession_original(session: TokenResponse): Observable<boolean> {
    return this.tokenService.refreshToken(session).pipe(
      map(data => {
        console.log(`refreshToken repsonse is ${JSON.stringify(data)}`);
        this.tokenService.saveSession(data);
        return true;
      }),
      catchError((error: ErrorResponse) => {
        console.log(`inside checkSession ${JSON.stringify(error)}`);
        this.router.navigate(['/login']);
        return EMPTY;
      })
    );
  } */
}