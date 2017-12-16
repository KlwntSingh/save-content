import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders, HttpHeaderResponse} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import 'rxjs/add/operator/map'

import { APP_CONSTANTS } from './../app.constant'
@Injectable()
export class HttpInterceptorServices {

    constructor(private http: HttpClient, private _cookieService: CookieService){

    }

    public getRequestHeaders() : HttpHeaders{
        return new HttpHeaders().set(APP_CONSTANTS.AUTHORIZATION_TOKEN_NAME, "Session " + this._cookieService.get("token"));
    }

    public getRequestOption(){
        return {
            header : this.getRequestHeaders(),
            observe : 'response'
        }
    }
  
}