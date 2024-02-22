import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IncomeModel } from '../models/income.model';
import { Categories } from '../models/categories.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = 'http://localhost:5215';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Categories[]> {
    return this.http
      .get<Categories[]>(`${this.apiUrl}/Categories/GetCategories`)
      .pipe(
        catchError((error) => {
          console.error('Get all categories error:', error);
          return throwError(() => new Error('Failed to get categories'));
        })
      );
  }
}
