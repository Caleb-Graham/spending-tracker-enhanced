import { createSelector } from '@ngrx/store';
import {
  selectActiveCategory,
  selectCategories,
  selectExpenses,
  selectIncome,
} from '../features/spending.features';
import { CategoriesViewModel } from '../../components/categories/categories.viewmodel';
import { ChartsViewModel } from '../../components/charts/charts.viewmodel';

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
  selectExpenses,
  selectIncome,
  (expenses, income) => {
    const totalExpenseAmount = expenses.reduce(
      (sum, expense) => sum + Math.abs(expense.total_Amount),
      0
    );
    const totalIncomeAmount = income.reduce(
      (sum, income) => sum + Math.abs(income.total_Amount),
      0
    );

    const expensePieChartData = expenses.map((expense) => {
      const percentage = (
        (Math.abs(expense.total_Amount) / totalExpenseAmount) *
        100
      ).toFixed(2);
      return {
        name: `${expense.category_Name} (${percentage}%)`,
        value: Math.abs(expense.total_Amount),
      };
    });

    const incomePieChartData = income.map((income) => {
      const percentage = (
        (Math.abs(income.total_Amount) / totalIncomeAmount) *
        100
      ).toFixed(2);
      return {
        name: `${income.category_Name} (${percentage}%)`,
        value: Math.abs(income.total_Amount),
      };
    });

    return {
      expensePieChart: expensePieChartData,
      incomePieChart: incomePieChartData,
    } as ChartsViewModel;
  }
);
