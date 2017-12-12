import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core';
import { RoomContentService } from './roomcontent.service';

export class RoomContentComponent implements OnInit{

    private roomname: string;
    
    constructor(private roomContentService: RoomContentService,
        private route: ActivatedRoute){

    }

    ngOnInit() {
        console.log("sdfasdfasd");
        this.route.paramMap
          .switchMap((params: ParamMap) => {
            this.roomname = params.get('roomname');
            return this.roomContentService.getListOfFiles(this.roomname);
          });
    }
}