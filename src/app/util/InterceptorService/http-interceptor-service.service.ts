import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import * as Cookie from '../cookies/cookies';
import { catchError } from 'rxjs/operators';
import { CoreObservableService } from 'src/app/core/service/core-observable.service';
import { CourrentUser } from 'src/app/class/masterdowload';
import { ErrorServer } from 'src/app/class/errorServer';
import { ToastBadRequest } from './http-interceptor-service.util';
import { ToastService } from 'src/app/service/toast.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorServiceService implements HttpInterceptor {

  constructor( 
    private coreObservable: CoreObservableService,
    private _serviceToast: ToastService,
  ) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let request = req;
    
    const token: string = Cookie.getCookie(Cookie.tokenCookieName).toString();
    if (token && token.length > 0) {
      request = req.clone({
        setHeaders: {
          // authorization: `Bearer ${ Cookie.getCookie(Cookie.tokenCookieName) }`
        }
      });
    }

    
    let jsonUser: CourrentUser  = (Cookie.getCookie(Cookie.userCookieName).length > 0) ? JSON.parse(Cookie.getCookie(Cookie.userCookieName)) : undefined;
    if (jsonUser && (jsonUser.user_uuid && jsonUser.user_uuid.length > 0)) {
      if(environment.LOGIN == 'NEXUS_BO'){
        request = req.clone({
          setHeaders: {
            operator_id: jsonUser.user_uuid
          }
        }); 
      }
  
    }
    //#endregion token
    

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.returnLoginInteceptError()
        }

        if (err.status === 403) {
          this.returnLoginInteceptError()
        }

        if (err.status === 400) {
          this._serviceToast.showError('Bad Request 400: ',err.error.detail)
          // let error = err.error as ErrorServer
          // this._serviceToast.showError(ToastBadRequest(error.code!, error.detail!))
        }
// debugger
        if (err.status === 500) {
          this._serviceToast.showError('Error 500: ',err.error.detail)
        }

        return throwError( err );

      })
    );
  }

  returnLoginInteceptError(){
    this.coreObservable.logoutSesion();
  }
}
