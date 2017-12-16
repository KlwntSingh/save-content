import { Component, OnInit } from '@angular/core';

import { FileListingService } from './filelisting.service'

@Component({
  selector: 'filelisting-ui',
  templateUrl : './filelisting-ui.html'
})
export class FileListingComponent implements OnInit{
    
    private files: any[];
    
    public constructor(private fileListing: FileListingService){
        
    }
    
    ngOnInit(){
        this.files = this.fileListing.getFiles();
    }
}