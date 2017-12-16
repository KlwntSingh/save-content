import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'

export const appRoutes: Routes = [
    { path: 'room', component: HomeComponent },
    { path : '**', redirectTo : '/room' }
];