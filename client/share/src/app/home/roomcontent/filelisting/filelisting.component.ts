import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

import { FileListingService } from './filelisting.service'

@Component({
  selector: 'filelisting-ui',
  templateUrl : './filelisting-ui.html'
})
export class FileListingComponent implements OnInit{
    
    // private files: any[];
    @Input()
    files: any;
    
    @Output()
    private ItemClick = new EventEmitter();
    
    public constructor(private fileListing: FileListingService){
        
    }
    
    ngOnInit(){
        // this.files = this.fileListing.getFiles();
    }
    
    public onItemClick(fileName: string){
        var self = this;
        self.ItemClick.emit({
            fileName : fileName
        });
    }
}