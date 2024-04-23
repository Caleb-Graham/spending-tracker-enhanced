import { Component } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Categories } from '../../models/categories.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  expenseCategories: Categories[] = [];
  incomeCategories: Categories[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.expenseCategories = categories.filter((x) => x.type == 'Expense');
      this.incomeCategories = categories.filter((x) => x.type == 'Income');
    });
  }
}
