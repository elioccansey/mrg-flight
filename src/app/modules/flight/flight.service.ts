import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { FlightInfoPayload } from './flight-info.model';
import { environment } from '../../../environments/environments';

@Injectable({
    providedIn: 'root'
})
export class FlightService {
    private http = inject(HttpClient);

    private apiUrl = environment.backend.url;
    private token = environment.backend.token;
    private candidate = environment.backend.candidate;

    submitFlightInfo(flightInfo: FlightInfoPayload): Observable<unknown> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            token: this.token,
            candidate: this.candidate
        });

        return this.http.post<unknown>(this.apiUrl, flightInfo, { headers }).pipe(
            catchError((error: unknown) => {
                const message =
                    typeof error === 'object' && error && 'message' in error
                        ? (error as { message: string }).message
                        : 'Server error';
                return throwError(() => new Error(message));
            })
        );
    }
}
