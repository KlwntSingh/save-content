import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { HomeService } from './home.service';
import { RoomComponent } from './room/room.component';

@Component({
  selector: 'home',
  template : '<div><router-outlet></router-outlet></div>'
})
export class HomeComponent implements OnInit {

  private roomname: string;  

  constructor(private dialog: MatDialog, private _homeServices: HomeService){

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
                mine._homeServices.checkOrCreateRoom(this, function(status){
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
