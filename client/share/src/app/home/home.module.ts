import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoomComponent } from './../room/room.component';
import { MaterialModule } from './../core/material.module';
import { HomeComponent } from './home.component'
import { CoreModule } from './../core/core.module';

@NgModule({
  declarations: [
    RoomComponent,
    HomeComponent
  ],
  exports : [HomeComponent],
  entryComponents: [ RoomComponent ],
  imports: [ FormsModule, MaterialModule, CoreModule ],
  providers: [] 
  
})
export class HomeModule { }
