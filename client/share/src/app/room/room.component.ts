import {Component, Inject, OnInit} from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
    selector: 'room-component',
    templateUrl: './room.component.html',
  })

  export class RoomComponent {

    constructor(
      public dialogRef: MatDialogRef<RoomComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
    
    public gotRoomName(){
      this.data.cb((result)=>{
        if(!result){
          this.data.passwordRequired = !result;
        }else{
          this.dialogRef.close();
        }
      })
    }

  
}