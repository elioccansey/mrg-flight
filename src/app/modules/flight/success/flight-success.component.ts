import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-flight-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class FlightSuccessComponent {
  constructor(private router: Router, private authService: AuthService) { }

  goToForm() {
    this.router.navigate(['/flight-form']);
  }

   logout() {
    this.authService.logout();
  }
}
