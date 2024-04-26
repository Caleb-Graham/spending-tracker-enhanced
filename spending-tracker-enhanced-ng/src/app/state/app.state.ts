import { Category } from '../models/categories.model';

export interface SpendingState {
  categories: Category[];
  activeCategory: 'Expense' | 'Income';
}
