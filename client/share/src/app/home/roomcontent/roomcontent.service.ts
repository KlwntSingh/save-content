import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpResponseBase, HttpResponse, HttpHeaders, HttpHeaderResponse} from '@angular/common/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { HttpServices } from './../../core/http.services';
import { CommonService } from './../common.service'
import { API } from './../../app.constant';
import { IRoom } from './../room/room.interface'
import { BROWSER } from './../../app.constant'

@Injectable()
export class RoomContentService {

    public constructor(private _httpService: HttpServices, private _commonService: CommonService, public _router: Router){

    }

    public getListOfFiles(roomname:string, scb, fcb){
        console.log(roomname);
        var self  = this;
        var fn = self._commonService;
        self._httpService.get(API.ROOM_CONTENT, scb, function(res){
            fn.httpFailureCheck(res)   
        });
    }
}