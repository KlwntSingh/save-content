import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders, HttpHeaderResponse} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import { HttpInterceptorServices } from './http.interceptor.services';
import { APP_CONSTANTS } from './../app.constant'

@Injectable()
export class HttpServices {

    constructor(private http: HttpClient){

    }

    public get(url: string, scb, fcb){
        console.log(url);
        return this.http.get(url, {
            observe : 'response'
        }).map((res)=>{console.log(res);return res;})
                        .subscribe(scb, fcb);
    }
    
    public delete(url: string, scb, fcb){
        return this.http.delete(url, {
            observe : 'response'
        }).map((res)=>{console.log(res);return res;})
                        .subscribe(scb, fcb);
    }

    public post(url: string, json:any, scb, fcb){
        return this.http.post<any>(url, json, {
                    observe : 'response'
                })
                // .map((res) => {console.log(res); return res;})
                .subscribe(function(res){
                    console.log(res.headers)
                    scb(res);
                }, fcb)
    }
  
}