import { createSelector } from '@ngrx/store';
import {
  selectActiveCategory,
  selectCategories,
  selectChildExpenses,
  selectChildIncome,
  selectParentExpenses,
  selectParentIncome,
} from '../features/spending.features';
import { CategoriesViewModel } from '../../components/categories/categories.viewmodel';
import { SummaryViewModel } from '../../components/summary/summary.viewmodel';
import { Expense } from '../../models/expenses.model';
import { Income } from '../../models/income.model';

export const selectCategoriesViewModel = createSelector(
  selectCategories,
  selectActiveCategory,
  (categories, activeCategory) => {
    return {
      expenseCategories: categories.filter((x) => x.type === 'Expense'),
      incomeCategories: categories.filter((x) => x.type === 'Income'),
      activeCategory: activeCategory,
    } as CategoriesViewModel;
  }
);

export const selectChartsViewModel = createSelector(
  selectParentExpenses,
  selectParentIncome,
  selectChildExpenses,
  selectChildIncome,
  (
    parentExpenses: Expense[],
    parentIncome: Income[],
    childExpenses: Expense[],
    childIncome: Income[]
  ) => {
    const totalExpenseAmount = parentExpenses.reduce(
      (sum, expense) => sum + Math.abs(expense.total_Amount),
      0
    );
    const totalIncomeAmount = parentIncome.reduce(
      (sum, income) => sum + Math.abs(income.total_Amount),
      0
    );

    const expensePieChartData = parentExpenses.map((expense) => {
      const percentage = totalExpenseAmount
        ? ((Math.abs(expense.total_Amount) / totalExpenseAmount) * 100).toFixed(
            2
          )
        : '0.00';
      return {
        name: `${expense.category_Name}: ${percentage}%`,
        value: Math.abs(expense.total_Amount),
      };
    });

    const incomePieChartData = parentIncome.map((income) => {
      const percentage = totalIncomeAmount
        ? ((Math.abs(income.total_Amount) / totalIncomeAmount) * 100).toFixed(2)
        : '0.00';
      return {
        name: `${income.category_Name}: ${percentage}%`,
        value: Math.abs(income.total_Amount),
      };
    });

    return {
      expensePieChart: expensePieChartData,
      incomePieChart: incomePieChartData,
      parentExpenses: parentExpenses.map((expense) => ({
        ...expense,
        total_Amount: Math.abs(expense.total_Amount),
      })),
      childExpenses: childExpenses.map((expense) => ({
        ...expense,
        total_Amount: Math.abs(expense.total_Amount),
      })),
      parentIncome: parentIncome.map((income) => ({
        ...income,
        total_Amount: Math.abs(income.total_Amount),
      })),
      childIncome: childIncome.map((income) => ({
        ...income,
        total_Amount: Math.abs(income.total_Amount),
      })),
    } as SummaryViewModel;
  }
);
