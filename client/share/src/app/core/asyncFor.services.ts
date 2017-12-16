import { Injectable } from '@angular/core'

@Injectable()
export class AsyncFor {

    public asyncForAdv(list: any[], itemCb, finalCb){
        var count = 0
        if(list.length > 0){
            for(let i of list){
                itemCb(i, function(){
                    count++;
                    if(count == list.length){
                        finalCb();
                    }
                });
            }
        }else{
            finalCb();
        }
    }
  
}