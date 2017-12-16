import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpResponseBase, HttpResponse, HttpHeaders, HttpHeaderResponse} from '@angular/common/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UploadEvent } from 'ngx-file-drop';

@Injectable()
export class FileUploadService {

    
    private onDropFinish;
    
    public callOnDropFinishFn(event: UploadEvent){
        return this.onDropFinish(event);
    }
    
    public addOnDropFinishFn(fn){
        return this.onDropFinish = fn;
    }
    
}