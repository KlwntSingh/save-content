import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpResponseBase, HttpResponse, HttpHeaders, HttpHeaderResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpServices } from './../core/http.services';
import { IRoom } from './../room/room.interface'
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable()
export class HomeService {

    constructor(public _httpServices: HttpServices, public _cookieService: CookieService){

    }

    public checkOrCreateRoom(url: string, json: IRoom, cb ){
        this._httpServices.post(url, json, (res: HttpResponseBase) => {
            console.log(res);
            if(res.status == 401){
                
            } 
        console.log(res.headers.get("Authorization"));
        return res}, ()=>{})
    }

    public post(){

    }
  
}