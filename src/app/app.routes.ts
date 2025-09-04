import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { FlightFormComponent } from './modules/flight/flight-form/flight-form.component';
import { FlightSuccessComponent } from './modules/flight/success/flight-success.component';
import { LoginRedirectGuard } from './modules/auth/login-redirect.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [LoginRedirectGuard] },
    {
        path: 'flight-form',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./modules/flight/flight-form/flight-form.component').then(m => m.FlightFormComponent)
    },
    {
        path: 'flight-success',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./modules/flight/success/flight-success.component').then(m => m.FlightSuccessComponent)
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];
