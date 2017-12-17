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
import { UploadFile } from 'ngx-file-drop';
import { AsyncFor } from './../../core/asyncFor.services';
import { Crypto } from './../../core/crypto.services'
@Injectable()
export class RoomContentService {

    public constructor(private _httpService: HttpServices, private _commonService: CommonService, private _router: Router, private asyncFor : AsyncFor){

    }

    public getListOfFiles(roomname:string, scb, fcb){
        console.log(roomname);
        var self  = this;
        var fn = self._commonService;
        self._httpService.get(API.GET_ROOM_CONTENT, scb, function(res){
            fn.httpFailureCheck(res);   
        });
    }
    
    public uploadFiles(files: UploadFile[]){
        var self = this;
        let fn = function(){
            self._httpService.post(API.UPLOAD_ROOM_CONTENT, formData, (res)=>{
                console.log(res);
            }, (res)=>{
                console.log(res);
            })
        }
        
        const formData = new FormData();
        self.asyncFor.asyncForAdv(files, (file, cb)=>{
            file.fileEntry.file(event => {
                let reader = new FileReader();
                reader.onload = (ev: any) => {
                    console.log("content");
                    let text = ev.target.result;
                    let blob = new Blob([text], {type: event.type});
                    var ff = new File([blob], event.name, {type: event.type});
                    formData.append("file[]", ff);
                    cb();
                };
                reader.readAsArrayBuffer(event);
            });
        }, fn)
    }
}
