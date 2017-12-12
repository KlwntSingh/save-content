import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpResponseBase, HttpResponse, HttpHeaders, HttpHeaderResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpServices } from './../core/http.services';
import { IRoom } from './../room/room.interface'
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable()
export class RoomContentService {

    public constructor(private _httpService: HttpServices){

    }

    public getListOfFiles(roomname:string){
        return Observable.create( observer => {
            this._httpService.get("/" + roomname, (res)=> {
                 console.log(res);
                 observer.next();
                 observer.complete();
            }, (res)=>{
                console.log(res);
            });
        });
    }
}