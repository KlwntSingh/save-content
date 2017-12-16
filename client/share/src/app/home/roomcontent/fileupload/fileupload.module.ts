import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { RouterModule, Routes }  from '@angular/router';

import { FileDropModule } from 'ngx-file-drop';
import { FileUploadService } from './fileupload.service';
import { FileUploadComponent } from './fileupload.component'

@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [ FileDropModule ],
  exports : [ FileUploadComponent ],
  providers: [ FileUploadService ] 
  
})
export class FileUploadModule { }
