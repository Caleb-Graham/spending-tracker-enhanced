import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Income } from '../models/income.model';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  private apiUrl = 'http://localhost:5215';

  constructor(private http: HttpClient) {}

  getIncome(): Observable<Income[]> {
    return this.http.get<Income[]>(`${this.apiUrl}/Income/GetIncome`).pipe(
      catchError((error) => {
        console.error('Get all income error:', error);
        return throwError(() => new Error('Failed to get income'));
      })
    );
  }
}
