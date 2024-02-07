import { Component, OnInit } from '@angular/core';
import { CSVService } from '../../services/csv-service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss',
})
export class BudgetComponent {
  constructor(private csvService: CSVService) {}

  onFileSelected($event: any) {
    const fileList: FileList | null = $event.target.files;

    if (fileList && fileList.length > 0) {
      const file: File = fileList[0];

      // Call a method to process the file or directly pass it to the service
      this.processFile(file);
    } else {
      console.error('No file selected');
    }
  }

  private processFile(file: File) {
    // You can perform additional processing on the file if needed
    // For now, let's pass it to the service
    console.log('file', file);
    this.csvService.uploadFile(file).subscribe((x) => console.log('x', x));
  }
}
