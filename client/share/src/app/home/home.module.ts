import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { RouterModule, Routes }  from '@angular/router';

import { MaterialModule } from './../core/material.module';
import { CoreModule } from './../core/core.module';

import { HomeComponent } from './home.component'
import { appRoutes } from './home.routes';
import { HomeService } from './home.service';
import { RoomComponent } from './room/room.component';
import { RoomContentModule } from './roomcontent/roomcontent.module'
import { CommonService } from './common.service'

@NgModule({
  declarations: [
    RoomComponent,
    HomeComponent
  ],
  entryComponents: [ RoomComponent ],
  imports: [ MaterialModule, FormsModule, RouterModule.forChild(appRoutes), CoreModule, RoomContentModule ],
  exports : [RouterModule, HomeComponent],
  providers: [ CommonService, CookieService, HomeService ] 
  
})
export class HomeModule { }
