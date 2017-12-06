import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpServices } from './http.services';

@NgModule({
  declarations: [
  ], 
  imports: [ HttpClientModule ],
  providers: [ HttpServices ] 
  
})
export class CoreModule { }
