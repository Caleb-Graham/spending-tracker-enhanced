import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Expense } from '../models/expenses.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = 'http://localhost:5215';

  constructor(private http: HttpClient) {}

  getExpenses(startDate?: Date, endDate?: Date): Observable<Expense[]> {
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
      .get<Expense[]>(`${this.apiUrl}/Expenses/GetExpenses`, { params })
      .pipe(
        catchError((error) => {
          console.error('Get all expenses error:', error);
          return throwError(() => new Error('Failed to get expenses'));
        })
      );
  }
}
