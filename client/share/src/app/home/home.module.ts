import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoomComponent } from './../room/room.component';
import { MaterialModule } from './../core/material.module';
import { HomeComponent } from './home.component'
import { CoreModule } from './../core/core.module';
import { HomeService } from './home.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { RouterModule, Routes }  from '@angular/router';
import { appRoutes } from './routes.contant';

@NgModule({
  declarations: [
    RoomComponent,
    HomeComponent
  ],
  entryComponents: [ RoomComponent ],
  imports: [ FormsModule, MaterialModule, CoreModule, RouterModule.forRoot(appRoutes) ],
  exports : [HomeComponent, RouterModule],
  providers: [ CookieService, HomeService ] 
  
})
export class HomeModule { }
