import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = 'http://localhost:5215';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${this.apiUrl}/Category/GetCategories`)
      .pipe(
        catchError((error) => {
          console.error('Add category error:', error);
          return throwError(() => new Error('Failed to get categories'));
        })
      );
  }

  addCategory(category: Category): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.apiUrl}/Category/AddCategory`, category)
      .pipe(
        catchError((error) => {
          console.error('Add category error:', error);
          return throwError(() => new Error('Failed to add categories'));
        })
      );
  }

  updateCategory(category: Category): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.apiUrl}/Category/UpdateCategory`, category)
      .pipe(
        catchError((error) => {
          console.error('Update category error:', error);
          return throwError(() => new Error('Failed to update categories'));
        })
      );
  }

  deleteCategory(categoryName: string): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.apiUrl}/Category/DeleteCategory/${categoryName}`)
      .pipe(
        catchError((error) => {
          console.error('Delete category error:', error);
          return throwError(() => new Error('Failed to delete categories'));
        })
      );
  }
}
