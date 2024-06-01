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
    const expensePieChartData = expenses.map((expense) => ({
      name: expense.category_Name,
      value: Math.abs(expense.total_Amount),
    }));
    const incomePieChartData = income.map((income) => ({
      name: income.category_Name,
      value: Math.abs(income.total_Amount),
    }));

    return {
      expensePieChart: expensePieChartData,
      incomePieChart: incomePieChartData,
    } as ChartsViewModel;
  }
);
