import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Income } from '../models/income.model';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  private apiUrl = 'http://localhost:5215';

  constructor(private http: HttpClient) {}

  getIncome(startDate?: Date, endDate?: Date): Observable<Income[]> {
    let params = new HttpParams();

    // Add start date query parameter if provided
    if (startDate) {
      params = params.set('startDate', startDate.toISOString()); // Convert to ISO string format
    }

    // Add end date query parameter if provided
    if (endDate) {
      params = params.set('endDate', endDate.toISOString()); // Convert to ISO string format
    }

    return this.http
      .get<Income[]>(`${this.apiUrl}/Income/GetIncome`, { params })
      .pipe(
        catchError((error) => {
          console.error('Get all income error:', error);
          return throwError(() => new Error('Failed to get income'));
        })
      );
  }
}
