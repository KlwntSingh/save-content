import { NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpServices } from './http.services';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { HttpInterceptorServices } from './http.interceptor.services';

import { AsyncFor } from './asyncFor.services';


@NgModule({
  declarations: [
  ], 
  imports: [ HttpClientModule ],
  providers: [ HttpServices,
  {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorServices,
      multi: true
  }, CookieService, AsyncFor ] 
  
})
export class CoreModule { }
