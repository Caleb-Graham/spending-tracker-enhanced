import { Component } from '@angular/core';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.readCSV(file);
    }
  }

  readCSV(file: File) {
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const csv: string = e.target.result;
      const rows: string[] = csv.split('\n');

      // Process rows as needed (e.g., convert to array of objects)
      const data: any[] = rows.map((row) => {
        const columns: string[] = row.split(',');
        // Your logic to map CSV columns to objects
        return { column1: columns[0], column2: columns[1] /* ... */ };
      });

      console.log('data', data);
    };

    reader.readAsText(file);
  }
}
