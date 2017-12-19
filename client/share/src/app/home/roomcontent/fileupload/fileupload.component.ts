import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { FileDropModule, UploadFile, UploadEvent } from 'ngx-file-drop';

import { FileUploadService } from './fileupload.service'

@Component({
  selector: 'fileupload-ui',
  templateUrl : './fileupload-ui.html'
})
export class FileUploadComponent{

    
    @Output()
    private filesDropped = new EventEmitter();
    
    public constructor(private _fileuploadService: FileUploadService){
      
    }
   
    public dropped(event: UploadEvent) {
      var self = this;
      self.filesDropped.emit(event);
    }
   
    public fileOver(event){
      console.log(event);
    }
   
    public fileLeave(event){
      console.log(event);
    }
  
}