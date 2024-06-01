import { Category } from '../models/category.model';
import { Expense } from '../models/expenses.model';
import { Income } from '../models/income.model';

export interface SpendingState {
  categories: Category[];
  expenses: Expense[];
  income: Income[];
  activeCategory: 'Expense' | 'Income';
}
