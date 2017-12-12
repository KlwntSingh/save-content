import { RouterModule, Routes } from '@angular/router';
import { RoomContentComponent } from './../roomcontent/roomcontent.component'

export const appRoutes: Routes = [
    { path: ':roomname', component: RoomContentComponent },
];