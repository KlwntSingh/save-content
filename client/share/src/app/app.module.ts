import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import { MaterialModule } from './core/material.module';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
