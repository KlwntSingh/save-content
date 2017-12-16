import { Injectable, OnDestroy } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpResponseBase, HttpResponse, HttpHeaders, HttpHeaderResponse} from '@angular/common/http';
import { Router } from '@angular/router';

import { BROWSER } from './../app.constant'

@Injectable()
export class CommonService implements OnDestroy {

    constructor(public _router: Router){
        console.log("constructor getting called");
    }

    public httpFailureCheck(res: HttpErrorResponse){
        let self = this;
        console.log("service got claled");
        if(res.status == 401){
            console.log(Router);
             console.log(self._router);
             return self._router.navigate([BROWSER.APP_HOME]);
        }
        else{
            console.error(res);
        }
    }
    
    ngOnDestroy(){
        console.log("destroy");
    }
}