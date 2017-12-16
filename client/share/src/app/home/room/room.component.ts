import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {IRoom} from './room.interface'

@Component({
    selector: 'room-component',
    templateUrl: './room.component.html',
  })

  export class RoomComponent {

    constructor(
      public dialogRef: MatDialogRef<RoomComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
    
    public gotRoomName(){
      var self = this;
      console.log(self.data);
      self.data.cb((result)=>{
        if(!result){
          self.data.passwordRequired = !result;
        }else{
          self.dialogRef.close();
        }
      })
    }

  
}