import { Category } from '../../models/category.model';

export interface CategoriesViewModel {
  expenseCategories: Category[];
  incomeCategories: Category[];
  activeCategory: 'Expense' | 'Income';
}
