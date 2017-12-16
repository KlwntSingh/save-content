import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { RoomContentService } from './roomcontent.service';
import { FileUploadService } from './fileupload/fileupload.service'


@Component({
  selector: 'roomcontent',
  template : '<div id="roomcontent"><fileupload-ui></fileupload-ui></div>'
})
export class RoomContentComponent implements OnInit{

    private roomname: string;
    
    constructor(private roomContentService: RoomContentService,
        private route: ActivatedRoute, private _fileuploadService: FileUploadService){

    }

    ngOnInit() {
        var self = this;
        console.log("sdfasdfasd");
        let roomname = self.route.snapshot.paramMap.get('roomname');
        self.roomContentService.getListOfFiles(roomname, ()=>{}, ()=>{})
        this._fileuploadService.addOnDropFinishFn((events)=>{
            console.log("Kuolwant isnsgh");
            console.log(events);
        })
    }
}