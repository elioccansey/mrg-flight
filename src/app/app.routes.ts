import { LoginComponent } from './modules/auth/login/login.component';
import { FlightFormComponent } from './modules/flight/flight-form/flight-form.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { FlightSuccessComponent } from './modules/flight/success/flight-success.component';
import { LoginRedirectGuard } from './modules/auth/login-redirect.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { Routes } from '@angular/router';


export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard] },
    { path: 'flight-form', component: FlightFormComponent, canActivate: [AuthGuard] },
    { path: 'flight-success', component: FlightSuccessComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];
