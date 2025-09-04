import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, RouterModule]
})
export class RegisterComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    registerForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    errorMessage = signal<string | null>(null);

    onSubmit(): void {
        if (this.registerForm.invalid) return;
        const { email, password } = this.registerForm.value;
        this.authService.register(email ?? '', password ?? '')
            .then(() => this.router.navigate(['/flight-form']))
            .catch(err => this.errorMessage.set(this.getFriendlyErrorMessage(err)));
    }

    signInWithGoogle(): void {
        this.authService.signInWithGoogle()
            .then(() => this.router.navigate(['/flight-form']))
            .catch(err => this.errorMessage.set(this.getFriendlyErrorMessage(err)));
    }

    private getFriendlyErrorMessage(error: unknown): string {
        if (typeof error === 'object' && error && 'code' in error) {
            const code = (error as { code: string }).code;
            switch (code) {
                case 'auth/email-already-in-use':
                    return 'This email is already registered. Please sign in.';
                case 'auth/invalid-email':
                    return 'Please enter a valid email address.';
                case 'auth/weak-password':
                    return 'Password should be at least 6 characters.';
                case 'auth/popup-closed-by-user':
                    return 'Sign in was cancelled. Please try again.';
                case 'auth/cancelled-popup-request':
                    return 'Sign in was cancelled. Please try again.';
                case 'auth/account-exists-with-different-credential':
                    return 'An account already exists with a different sign-in method. Please use the correct provider.';
                default:
                    console.error(error);
                    return 'An unexpected error occurred. Please try again.';
            }
        }
        console.error(error);
        return 'An unexpected error occurred. Please try again.';
    }
}