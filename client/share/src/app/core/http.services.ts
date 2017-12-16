import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders, HttpHeaderResponse} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import { HttpInterceptorServices } from './http.interceptor.services';

@Injectable()
export class HttpServices {

    constructor(private http: HttpClient, private _httpInterceptor: HttpInterceptorServices){

    }

    public get(url: string, scb, fcb){
        return this.http.get(url, {
            observe : 'response',
            headers : this._httpInterceptor.getRequestHeaders()
        }).map((res)=>{console.log(res);return res;})
                        .subscribe(scb, fcb);
    }

    public post(url: string, json:any, scb, fcb){
        return this.http.post<any>(url, json, {
                    observe : 'response',
                     headers : this._httpInterceptor.getRequestHeaders()
                })
                // .map((res) => {console.log(res); return res;})
                .subscribe(function(res){
                    console.log(res.headers)
                    scb(res);
                }, fcb)
    }
  
}