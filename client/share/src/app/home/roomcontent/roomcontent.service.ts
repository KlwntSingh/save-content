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

    public constructor(private _httpService: HttpServices, private _commonService: CommonService, private _router: Router, private asyncFor : AsyncFor, private _cookieService: CookieService){

    }

    public getListOfFiles(roomname:string, scb, fcb){
        console.log(roomname);
        var self  = this;
        var fn = self._commonService;
        console.log(API.GET_ALL_ROOM_CONTENT);
        self._httpService.get(API.GET_ALL_ROOM_CONTENT, (res)=>{
            let files = res.body;
            scb(files.map((item)=>{
                let rTurn = {
                    fileName : item.fileName,
                    type: item.type,
                    url: API.ROOM_CONTENT + "/" + item.fileName
                };
                console.log(item);
                if(item.type == "jpg" || item.type == "png")
                self.getFileContent(rTurn, (content)=>{
                    console.log(content);
                    // let blob = new Blob([content], {type: 'image/jpeg'});
                    rTurn["localurl"] = 'data:image/PNG;base64,' + content
                }, ()=>{})
                return rTurn
            }));
        }, function(res){
            fn.httpFailureCheck(res);   
        });
    }
    
    public getFileContent(file: any, scb, fcb){
        var self  = this;
        var fn = self._commonService;
        self._httpService.getImage(file.url, (res)=>{
                let files = res.body;
                console.log(files.img);
                scb(files.img);
            }, function(res){
                alert()
                fn.httpFailureCheck(res);   
        });
    }
    
    public uploadFiles(files: UploadFile[], scb, fcb){
        var self = this;
        let fn = function(){
            self._httpService.post(API.ROOM_CONTENT, formData, (res)=>{
                let files = res.body;
                scb(files.map((item)=>{
                let rTurn = {
                    fileName : item.fileName,
                    type: item.type,
                    url: API.ROOM_CONTENT + "/" + item.fileName
                };
                console.log(item);
                if(item.type == "jpg" || item.type == "png")
                self.getFileContent(rTurn, (content)=>{
                    console.log(content);
                    // let blob = new Blob([content], {type: 'image/jpeg'});
                    rTurn["localurl"] = 'data:image/PNG;base64,' + content
                }, ()=>{})
                return rTurn
            }));
                // scb(res.body);
            }, (res)=>{
                fcb(res);
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
    
    public downloadFile(fileName: string, cb, fcb){
        var self = this;
        let token = self._cookieService.get("token");
        window.open(API.ROOM_CONTENT + "/" + fileName + "/download?token="+token);
    }
}
