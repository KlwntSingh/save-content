import { Component, Input, Output, EventEmitter  } from '@angular/core';


@Component({
  selector: 'filelisting-ui',
  templateUrl : './filelisting-ui.html',
  styleUrls: ['filelisting-ui.css'],
})
export class FileListingComponent {
    
    // private files: any[];
    @Input()
    files: any;
    
    @Output()
    private ItemClick = new EventEmitter();
    
    public constructor(){
        
    }
    
    public deleteItem(file: any){
        var self = this;
        let fileName = file.fileName;
        self.ItemClick.emit({
            action: 'delete',
            fileName : fileName
        });
    }
    
    public downloadItem(file: any){
        var self = this;
        console.log(file);
        let fileName = file.fileName;
        self.ItemClick.emit({
            action: 'download',
            fileName : fileName
        });
    }
}