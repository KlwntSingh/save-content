import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RoomComponent } from './../room/room.component';
import { HomeService } from './home.service';

@Component({
  selector: 'home',
  template : '<div></div>'
})
export class HomeComponent implements OnInit {

  private roomname: string;  

  constructor(public dialog: MatDialog, public _homeServices: HomeService){

  }

  ngOnInit(){
    var mine = this;
    setTimeout(function(){
      let dialogRef = mine.dialog.open(RoomComponent, {
        width: '750px',
        disableClose: true,
        data: {
             roomName: "asdf", 
             passwordRequired: false, 
             password:null, 
             cb: function(cb){
               console.log(this);
                mine._homeServices.checkOrCreateRoom("http://localhost:3000/share/room/validate", this, function(status){
                  cb(status);
                });
             } 
        }
      })
      dialogRef.afterClosed().subscribe( result => {
        console.log(result);
      })
    }, 100)
  }
}
