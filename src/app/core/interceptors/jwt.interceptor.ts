import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = localStorage.getItem(environment.tkn);
    const isAuthenticated = currentUser ;
    if (isAuthenticated) {
      let appToken: string = "";
      if (req.urlWithParams.includes("/IndicadoresWeb/") || req.urlWithParams.includes("/Indicadores/")){
        if (localStorage.getItem("TokenIndicadoresWeb") !== null){
          appToken = localStorage.getItem("TokenIndicadoresWeb") + "";
        }
      }

      req = req.clone({
        setHeaders: {
          // 'Content-Type': 'application/json',
          'Authorization': "Bearer " + appToken.replace(/"/ig,"")
        }
      });
    }
  
    return next.handle(req);
  }
}