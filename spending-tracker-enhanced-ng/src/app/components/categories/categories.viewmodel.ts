import { Category } from '../../models/categories.model';

export interface CategoriesViewModel {
  expenseCategories: Category[];
  incomeCategories: Category[];
  activeCategory: 'Expense' | 'Income';
}
