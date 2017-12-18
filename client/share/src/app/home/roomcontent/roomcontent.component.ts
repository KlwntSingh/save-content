import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { RoomContentService } from './roomcontent.service';
import { FileUploadService } from './fileupload/fileupload.service'
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { FileListingComponent } from './filelisting/filelisting.component'
import { FileListingService } from './filelisting/filelisting.service'

@Component({
  selector: 'roomcontent',
  template : '<div id="roomcontent"><filelisting-ui [files]="files" (ItemClick)="deleteItem($event)"></filelisting-ui><fileupload-ui></fileupload-ui></div>'
})
export class RoomContentComponent implements OnInit{

    private roomname: string;
    private files: any;
    
    constructor(private roomContentService: RoomContentService,
        private route: ActivatedRoute, private _fileuploadService: FileUploadService, private _fileListingService: FileListingService){

    }

    ngOnInit() { 
        var self = this;
        console.log("sdfasdfasd");
        let roomname = self.route.snapshot.paramMap.get('roomname');
        self.roomContentService.getListOfFiles(roomname, (files)=>{
            self.files = files;
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
    public deleteItem(event) {
            console.log(event);
            console.log("delete file claled");
            var self = this;
            let fileName = event.fileName;
            this.roomContentService.deleteFile(fileName, () => {
                console.log("deleted file" + fileName);
                var newarr = self.files.filter((item)=>{
                    return item != fileName;
                })
                self.files = newarr;
            }, ()=>{
                
            });
    }
}