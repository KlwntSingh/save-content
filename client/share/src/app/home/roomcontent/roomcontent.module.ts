import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { RouterModule, Routes }  from '@angular/router';

import { MaterialModule } from './../../core/material.module';
import { CoreModule } from './../../core/core.module';

import { RoomContentComponent } from './roomcontent.component'
import { RoomContentService } from './roomcontent.service'
import { CommonService } from './../common.service'
import { FileUploadModule  } from './fileupload/fileupload.module'

@NgModule({
  declarations: [
    RoomContentComponent
  ],
  entryComponents: [ ],
  imports: [ MaterialModule, FormsModule, CoreModule, FileUploadModule ],
  exports : [RouterModule],
  providers: [ CommonService, CookieService, RoomContentService ] 
  
})
export class RoomContentModule { }
