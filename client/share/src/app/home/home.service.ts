import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpResponseBase, HttpResponse, HttpHeaders, HttpHeaderResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { RouterModule, Routes, Router } from '@angular/router';

import { HttpServices } from './../core/http.services';
import { APP_CONSTANTS } from './../app.constant'
import { API } from './../app.constant'

import { IRoom } from './room/room.interface'

@Injectable()
export class HomeService {

    constructor(private _httpServices: HttpServices, private _cookieService: CookieService, private _router: Router ){

    }

    public checkOrCreateRoom(json: IRoom, cb){
        var self = this;
        self._httpServices.post(API.VALIDATE, json,
        (res) => {
            console.log(res);
            let data = res;
            if(res.status == 401){
                return cb(false);
            }else{
                cb(true);
                self._cookieService.put(APP_CONSTANTS.TOKEN_KEY_NAME,  res.headers.get(APP_CONSTANTS.AUTHORIZATION_TOKEN_NAME));
                self._router.navigate(['/room/' + json.roomName]);
                return res;
            } 
            
        }, (err)=>{
            
        })
    }

    public post(){

    }
  
}