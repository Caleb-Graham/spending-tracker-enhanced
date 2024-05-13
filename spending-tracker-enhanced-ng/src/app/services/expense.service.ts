import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Expense } from '../models/expenses.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private apiUrl = 'http://localhost:5215';

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/Expenses/GetExpenses`).pipe(
      catchError((error) => {
        console.error('Get all expenses error:', error);
        return throwError(() => new Error('Failed to get expenses'));
      })
    );
  }
}
