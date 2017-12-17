import { Injectable } from '@angular/core'
declare var sjcl: any;

@Injectable()
export class Crypto {
    
    private crypto: any ;
    constructor(){
        this.crypto = new sjcl.cipher.aes("asdffd");
    }
    public encrypt(text){
        return this.crypto.encrypt(text);
    }
    
    public decrypt(text){
        return this.crypto.decrypt(text);
    }
  
}