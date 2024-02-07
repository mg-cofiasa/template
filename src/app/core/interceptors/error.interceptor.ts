import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from './../services/error.handler.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorHandler:ErrorHandlerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if ([400, 403, 404, 500].includes(error.status) && localStorage.getItem(environment.tkn)) {
          // TODO: Change for Refresh token
         
          this.errorHandler.handleError(error);
        }
        else if ([401].includes(error.status) && !localStorage.getItem(environment.tkn)) {
          this.errorHandler.handleError(error);
        }
        else
        {
          this.errorHandler.handleError(error);
        }
          
        return throwError(() => error);
      })
    );
  }
}
