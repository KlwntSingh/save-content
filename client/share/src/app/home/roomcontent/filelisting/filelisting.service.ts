import { Injectable } from '@angular/core'

@Injectable()
export class FileListingService {

    private files : any[];
    private handlerForItemClick;
    public getFiles(){
        return this.files;
    }
    
    public setFiles(files: any[]){
        this.files = files
    }
    
    public addHandlerForItemClick(fn){
        this.handlerForItemClick = fn;
    }
    
    public callHandlerForItemClick(fileName: string){
        return this.handlerForItemClick(fileName);
    }
}
