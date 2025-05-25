import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'travels', loadChildren: () => import('./travels/travel.routes').then(m => m.travelRoutes)},
    { path: 'profile', loadChildren: () => import('./profile/profile.routes').then(m => m.profileRoutes)},
    { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)},
    { path: 'messages', loadChildren: () => import('./messages/message.routes').then(m => m.messageRoutes)},
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: "/home", pathMatch: "full"},
    { path: '**', redirectTo: "/home"},
];
