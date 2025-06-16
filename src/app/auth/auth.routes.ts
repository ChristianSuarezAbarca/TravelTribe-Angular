import { Routes } from "@angular/router";

export const authRoutes: Routes = [
    { path: 'login', loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent), title: 'Login'},
    { path: 'users', loadComponent: () => import('./users/users.component').then((m) => m.UsersComponent), title: 'Users'},
];