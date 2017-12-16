import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpServices } from './http.services';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { HttpInterceptorServices } from './http.interceptor.services';

import { AsyncFor } from './asyncFor.services';


@NgModule({
  declarations: [
  ], 
  imports: [ HttpClientModule ],
  providers: [ HttpServices, HttpInterceptorServices, CookieService, AsyncFor ] 
  
})
export class CoreModule { }
