import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpServices {

    constructor(private http: HttpClient){

    }

    public get(url: string){
        return this.http.get(url);
    }

    public post(){

    }
  
}