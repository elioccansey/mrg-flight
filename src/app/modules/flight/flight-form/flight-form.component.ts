import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FlightService } from '../flight.service';
import { FlightInfoPayload } from '../flight-info.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule]
})
export class FlightFormComponent {
  private fb = inject(FormBuilder);
  private flightService = inject(FlightService);
  private router = inject(Router);

  flightForm = this.fb.group({
    airline: ['', Validators.required],
    arrivalDate: ['', Validators.required],
    arrivalTime: ['', Validators.required],
    flightNumber: ['', Validators.required],
    numOfGuests: [1, [Validators.required, Validators.min(1)]],
    comments: ['']
  });

  successMessage = signal<string>('');
  errorMessage = signal<string>('');

  private getFriendlyErrorMessage(error: unknown): string {
    if (typeof error === 'object' && error) {
      // Angular HttpErrorResponse has a status property
      if ('status' in error) {
        const status = (error as { status: number }).status;
        switch (status) {
          case 0:
            return 'Network error: Unable to reach the server. Please check your connection and try again.';
          case 401:
            return 'Unauthorized: Please log in again.';
          case 403:
            return 'Forbidden: You do not have permission to perform this action.';
          case 404:
            return 'Service not found. Please try again later.';
          case 500:
            return 'Server error. Please try again later.';
          default:
            return 'An unexpected error occurred. Please try again.';
        }
      }
      // If error has a message property
      if ('message' in error) {
        return (error as { message: string }).message;
      }
    }
    return 'An unexpected error occurred. Please try again.';
  }

  onSubmit(): void {
    this.successMessage.set('');
    this.errorMessage.set('');

    if (this.flightForm.invalid) return;

    const payload: FlightInfoPayload = this.flightForm.value as FlightInfoPayload;

    this.flightService.submitFlightInfo(payload).subscribe({
      next: () => {
        this.successMessage.set('Flight details submitted successfully!');
        this.router.navigate(['/flight-success']);
        this.flightForm.reset({
          airline: '',
          arrivalDate: '',
          arrivalTime: '',
          flightNumber: '',
          numOfGuests: 1,
          comments: ''
        });
      },
      error: (err: unknown) => {
        this.errorMessage.set('Failed to submit flight details: ' + this.getFriendlyErrorMessage(err));
      }
    });
  }
}