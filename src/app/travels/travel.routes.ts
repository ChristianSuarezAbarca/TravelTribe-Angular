import { Routes } from '@angular/router';

export const travelRoutes: Routes = [
    { path: '', loadComponent: () => import('./travels-page/travels-page.component').then((m) => m.TravelsPageComponent), title: 'Travels' },
    { path: 'popular', loadComponent: () => import('./travels-page/popular-travels/popular-travels.component').then((m) => m.PopularTravelsComponent), title: 'Popular Travels' },
    { path: 'adventure', loadComponent: () => import('./travels-page/adventure-travels/adventure-travels.component').then((m) => m.AdventureTravelsComponent), title: 'Adventure Trips' },
    // { path: 'add', canDeactivate: [leavePageGuard], canActivate: [loginActivateGuard], loadComponent: () => import('./event-form/event-form.component').then((m) => m.EventFormComponent), title: 'New event' },
    // { path: ':id', canActivate: [numericIdGuard, loginActivateGuard], resolve: { event: eventResolver }, loadComponent: () => import('./event-detail/event-detail.component').then((m) => m.EventDetailComponent) },
    // { path: ':id/edit', canDeactivate: [leavePageGuard], canActivate: [loginActivateGuard], loadComponent: () => import('./event-form/event-form.component').then((m) => m.EventFormComponent), title: 'Edit event' }
];