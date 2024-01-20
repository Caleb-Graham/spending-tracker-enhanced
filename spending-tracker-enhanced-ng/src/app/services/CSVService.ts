import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CSVService {
  private apiUrl = 'http://localhost:5215';

  constructor(private http: HttpClient) {}

  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name); // This line might be causing the issue

    return this.http.post(`${this.apiUrl}/CSV/UploadFile`, formData);
  }
}
