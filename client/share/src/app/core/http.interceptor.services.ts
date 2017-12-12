import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders, HttpHeaderResponse} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import 'rxjs/add/operator/map'

@Injectable()
export class HttpInterceptorServices {

    constructor(private http: HttpClient, private _cookieService: CookieService){

    }

    public getRequestHeaders() : HttpHeaders{
        return new HttpHeaders().set("Authorization", "Session " + this._cookieService.get("token"));
    }

    public getRequestOption(){
        return {
            header : this.getRequestHeaders(),
            observe : 'response'
        }
    }
  
}