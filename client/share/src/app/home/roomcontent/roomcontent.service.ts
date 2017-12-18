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

@Injectable()
export class RoomContentService {

    public constructor(private _httpService: HttpServices, private _commonService: CommonService, private _router: Router, private asyncFor : AsyncFor){

    }

    public getListOfFiles(roomname:string, scb, fcb){
        console.log(roomname);
        var self  = this;
        var fn = self._commonService;
        console.log(API.GET_ALL_ROOM_CONTENT);
        self._httpService.get(API.GET_ALL_ROOM_CONTENT, (res)=>{
            let files = res.body;
            scb(files.map((item)=>{
                return {
                    name : item.name,
                    type: item.type,
                    url: API.ROOM_CONTENT + "/" + item.name
                }
            }));
        }, function(res){
            fn.httpFailureCheck(res);   
        });
    }
    
    public uploadFiles(files: UploadFile[]){
        var self = this;
        let fn = function(){
            self._httpService.post(API.ROOM_CONTENT, formData, (res)=>{
                console.log(res);
            }, (res)=>{
                console.log(res);
            })
        }
        
        const formData = new FormData();
        self.asyncFor.asyncForAdv(files, (file, cb)=>{
            file.fileEntry.file(event => {
                formData.append("file[]", event);
                cb();
            });
        }, fn)
    }
    
    public deleteFile(fileName: string, cb, fcb){
        var self = this;
        self._httpService.delete(API.ROOM_CONTENT + "/" + fileName, (res)=>{
            console.log(res);
            cb();
        }, (res)=>{
            console.log(res);
        })
    }
}
