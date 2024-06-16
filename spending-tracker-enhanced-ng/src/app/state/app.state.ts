import { Category } from '../models/category.model';
import { Expense } from '../models/expenses.model';
import { Income } from '../models/income.model';

export interface SpendingState {
  categories: Category[];
  parentExpenses: Expense[];
  childExpenses: Expense[];
  parentIncome: Income[];
  childIncome: Income[];
  activeCategory: 'Expense' | 'Income';
}
