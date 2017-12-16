import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { FileDropModule, UploadFile, UploadEvent } from 'ngx-file-drop';

import { FileUploadService } from './fileupload.service'

@Component({
  selector: 'fileupload-ui',
  templateUrl : './fileupload-ui.html'
})
export class FileUploadComponent{

    public files: UploadFile[] = [];
    
    public constructor(private _fileuploadService: FileUploadService){
      
    }
   
    public dropped(event: UploadEvent) {
      this.files = event.files;
      this._fileuploadService.callOnDropFinishFn(event);
      for (var file of event.files) {
        file.fileEntry.file(info => {
          console.log(info);
        });
      }
    }
   
    public fileOver(event){
      console.log(event);
    }
   
    public fileLeave(event){
      console.log(event);
    }
  
}