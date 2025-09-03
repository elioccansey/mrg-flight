import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class LoginRedirectGuard implements CanActivate {
    private authService = inject(AuthService);
    private router = inject(Router);

    canActivate(): Promise<boolean> {
        // Wait until auth state is resolved before making a decision
        return new Promise(resolve => {
            const check = () => {
                if (this.authService.isAuthResolved()) {
                    if (this.authService.isLoggedIn()) {
                        this.router.navigate(['/flight-form']);
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                } else {
                    // Wait and check again
                    setTimeout(check, 50);
                }
            };
            check();
        });
    }
}