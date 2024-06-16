import { Expense } from '../../models/expenses.model';
import { Income } from '../../models/income.model';

export interface SummaryViewModel {
  expensePieChart: any[];
  incomePieChart: any[];
  parentExpenses: Expense[];
  childExpenses: Expense[];
  parentIncome: Income[];
  childIncome: Income[];
}
