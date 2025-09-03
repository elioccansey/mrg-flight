// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../../modules/auth/auth.service';
// import { NgIf } from '@angular/common';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss'],
//   standalone: true,
//   imports: [NgIf],
// })
// export class NavbarComponent {
//   dropdownOpen = false;

//   constructor(private authService: AuthService, private router: Router) { }

//   toggleDropdown() {
//     this.dropdownOpen = !this.dropdownOpen;
//   }

//   closeDropdown() {
//      setTimeout(() => {
//       this.dropdownOpen = false;
//     }, 200);
//   }

//   logout() {
//     this.authService.logout().then(() => {
//       this.router.navigate(['/login']);
//     });
//   }
// }
import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../modules/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'navigation'
  }
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  dropdownOpen = signal(false);

  isAuthResolved = computed(() => this.authService.isAuthResolved());
  isLoggedIn = computed(() => this.authService.isLoggedIn());

  toggleDropdown(): void {
    this.dropdownOpen.update(open => !open);
  }

  closeDropdown(): void {
    setTimeout(() => this.dropdownOpen.set(false), 200);
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}