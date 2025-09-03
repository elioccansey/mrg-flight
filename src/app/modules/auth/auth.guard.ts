// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from './auth.service';
// import { Observable, map, take } from 'rxjs';

// @Injectable({
//     providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//     constructor(private authService: AuthService, private router: Router) { }

//     canActivate(): Observable<boolean> {
//         return this.authService.isLoggedIn().pipe(
//             take(1), // take the first emitted value and complete
//             map(isLoggedIn => {
//                 if (isLoggedIn) {
//                     return true;
//                 } else {
//                     this.router.navigate(['/login']);
//                     return false;
//                 }
//             })
//         );
//     }
// }
import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private authService = inject(AuthService);
    private router = inject(Router);

    canActivate(): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}