import { Routes } from '@angular/router';
import { travelResolver } from '../shared/resolvers/travel.resolver';

export const travelRoutes: Routes = [
    { path: '', loadComponent: () => import('./travels-page/travels-page.component').then((m) => m.TravelsPageComponent), title: 'Travels' },
    { path: 'popular', loadComponent: () => import('./travels-page/popular-travels/popular-travels.component').then((m) => m.PopularTravelsComponent), title: 'Popular Travels' },
    { path: 'adventure', loadComponent: () => import('./travels-page/adventure-travels/adventure-travels.component').then((m) => m.AdventureTravelsComponent), title: 'Adventure Trips' },
    { path: 'add', loadComponent: () => import('./new-travel/new-travel.component').then((m) => m.NewTravelComponent), title: 'New Travel' },
    { path: ':id', resolve: { travel: travelResolver }, loadComponent: () => import('./travel-detail/travel-detail.component').then((m) => m.TravelDetailComponent) }
];