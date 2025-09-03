import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  loginForm = inject(FormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  errorMessage = signal<string | null>(null);

  private authService = inject(AuthService);
  private router = inject(Router);

  private getFriendlyErrorMessage(error: unknown): string {
    if (typeof error === 'object' && error && 'code' in error) {
      const code = (error as { code: string }).code;
      switch (code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          return 'Invalid email or password. Please try again.';
        default:
          return 'An unexpected error occurred. Please try again.';
      }
    }
    return 'An unexpected error occurred. Please try again.';
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    const email = this.loginForm.value.email ?? '';
    const password = this.loginForm.value.password ?? '';
    this.authService.login(email, password)
      .then(() => this.router.navigate(['/flight-form']))
      .catch(err => this.errorMessage.set(this.getFriendlyErrorMessage(err)));
  }
}
