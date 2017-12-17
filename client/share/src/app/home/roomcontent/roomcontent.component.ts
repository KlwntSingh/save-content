import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { RoomContentService } from './roomcontent.service';
import { FileUploadService } from './fileupload/fileupload.service'
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { FileListingComponent } from './filelisting/filelisting.component'
import { FileListingService } from './filelisting/filelisting.service'
import { Crypto } from './../../core/crypto.services'

@Component({
  selector: 'roomcontent',
  template : '<div id="roomcontent"><fileupload-ui></fileupload-ui><filelisting-ui></filelisting-ui></div>'
})
export class RoomContentComponent implements OnInit{

    private roomname: string;
    
    constructor(private roomContentService: RoomContentService,
        private route: ActivatedRoute, private _fileuploadService: FileUploadService, private _fileListingService: FileListingService){

    }

    ngOnInit() {
        var self = this;
        console.log("sdfasdfasd");
        let roomname = self.route.snapshot.paramMap.get('roomname');
        self.roomContentService.getListOfFiles(roomname, (res)=>{
            let files = res.body;
            self._fileListingService.setFiles(files);
        }, (res)=>{
            
        })
        this._fileuploadService.addOnDropFinishFn((events: UploadEvent)=>{
            console.log("Kuolwant isnsgh");
            console.log(events);
           if(events && events.files){
              let files: UploadFile[] = events.files;
              this.roomContentService.uploadFiles(files);
            }
        })
    }
}