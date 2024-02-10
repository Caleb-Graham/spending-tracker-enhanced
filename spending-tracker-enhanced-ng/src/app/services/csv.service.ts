import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CSVService {
  private apiUrl = 'http://localhost:5215';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/CSV/UploadFile`, formData).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        console.error('File upload error:', error);
        return throwError(() => new Error('File upload failed'));
      })
    );
  }
}
