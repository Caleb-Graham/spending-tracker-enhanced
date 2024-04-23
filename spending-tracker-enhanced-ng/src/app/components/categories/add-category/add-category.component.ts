import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent {
  categoryName: string = '';

  constructor() {}

  saveCategory() {
    // Add logic to save category
    console.log('Category Name:', this.categoryName);
  }

  cancel() {
    // Add logic to cancel
    console.log('Cancelled');
  }
}
