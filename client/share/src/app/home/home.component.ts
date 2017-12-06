import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { RoomComponent } from './../room/room.component';
import { HttpServices } from './../core/http.services';

@Component({
  selector: 'home',
  template : '<div></div>'
})
export class HomeComponent implements OnInit {

  private roomname: string;  

  constructor(public dialog: MatDialog, public _httpServices: HttpServices){

  }

  ngOnInit(){
    var mine = this;
    setTimeout(function(){
      let dialogRef = mine.dialog.open(RoomComponent, {
        width: '750px',
        data: {
             roomname: "asdf", 
             passwordRequired: false, 
             password:null, 
             cb: function(cb){
                mine._httpServices.get("/kulwant").subscribe((res)=>{
                  if(true){
                    cb(false);
                  }
                }, () =>{
                  if(true){
                    cb(false);
                  }
                })
             } 
        }
      })
      dialogRef.afterClosed().subscribe( result => {
        console.log(result);
      })
    }, 100)
  }
}
