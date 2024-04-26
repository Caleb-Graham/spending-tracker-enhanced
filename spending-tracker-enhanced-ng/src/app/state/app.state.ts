import { Category } from '../models/category.model';

export interface SpendingState {
  categories: Category[];
  activeCategory: 'Expense' | 'Income';
}
