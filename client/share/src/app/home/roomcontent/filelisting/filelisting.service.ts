import { Injectable } from '@angular/core'

@Injectable()
export class FileListingService {

    private files : any[];

    public getFiles(){
        return this.files;
    }
    
    public setFiles(files: any[]){
        this.files = files
    }
}
