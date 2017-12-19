import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import 'rxjs/add/operator/switchMap';

import { RoomContentService } from './roomcontent.service';
import { FileUploadService } from './fileupload/fileupload.service'
import { UploadEvent, UploadFile } from 'ngx-file-drop';

@Component({
  selector: 'roomcontent',
  template : '<div id="roomcontent"><fileupload-ui (filesDropped)="newFilesDropped($event)"></fileupload-ui><filelisting-ui [files]="files" (ItemClick)="itemClickAction($event)"></filelisting-ui></div>'
})
export class RoomContentComponent implements OnInit{

    private roomname: string;
    private files: any;
    private newFiles: any;
    
    constructor(private roomContentService: RoomContentService,
        private route: ActivatedRoute, private _fileuploadService: FileUploadService){

    }

    ngOnInit() { 
        var self = this;
        let roomname = self.route.snapshot.paramMap.get('roomname');
        self.roomContentService.getListOfFiles(roomname, (files)=>{
            self.files = files;
        }, (res)=>{
            console.log(res);  
        })
    }
    
    public newFilesDropped(events){
        let self = this;
       if(events && events.files){
          let files: UploadFile[] = events.files;
          this.roomContentService.uploadFiles(files, (res)=>{
              var arr = self.files
              console.log(arr.length);
              arr = arr.concat(res);
              console.log(arr.length);
              self.files = arr;
              console.log(arr);
              let fill = self.files[0];
            //   fill.fileName += 'q';
          }, (res)=>{
              console.log(res);
          });
        }
    }
    public itemClickAction(event) {
            var self = this;
            let fileName = event.fileName;
            if(event.action == 'delete'){
                this.roomContentService.deleteFile(fileName, () => {
                    var newarr = self.files.filter((item)=>{
                        return item.fileName != fileName;
                    })
                    console.log(newarr.length);
                    console.log(self.files.length);
                    self.files = newarr;
                }, (res)=>{
                    console.log(res);
                });
            }else if(event.action == 'download'){
                console.log(fileName);
                this.roomContentService.downloadFile(fileName, (res) => {
                    console.log(res);
                }, (res)=>{
                    console.log(res);
                });
            }
    }
}