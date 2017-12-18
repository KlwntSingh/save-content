import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders, HttpHeaderResponse, HttpInterceptor} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import 'rxjs/add/operator/map'
import {Observable} from 'rxjs';

import { APP_CONSTANTS } from './../app.constant'
@Injectable()
export class HttpInterceptorServices implements HttpInterceptor {

    constructor(private _cookieService: CookieService){

    }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("interception");
        request = request.clone({
          setHeaders: {
            Authorization: `Session ${this._cookieService.get("token")}`
          }
        });
        return next.handle(request);
    }
  
}