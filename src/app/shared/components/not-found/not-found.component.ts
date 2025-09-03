import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'not-found-host'
    }
})
export class NotFoundComponent {
    private router = inject(Router);

    navigateToFlightForm() {
        this.router.navigate(['/flight-form']);
    }
}