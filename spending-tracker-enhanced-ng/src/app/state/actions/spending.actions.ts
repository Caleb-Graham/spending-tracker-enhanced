import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Category } from '../../models/category.model';
import { CategoryRequest } from '../../models/category-request.model';
import { Expense } from '../../models/expenses.model';
import { Income } from '../../models/income.model';

export const SpendingActions = createActionGroup({
  source: 'App',
  events: {
    getCategories: emptyProps(),
    getCategoriesSuccess: props<{ categories: Category[] }>(),
    getExpenses: props<{ startDate?: Date; endDate?: Date }>(),
    getExpensesSuccess: props<{ expenses: Expense[] }>(),
    getIncome: props<{ startDate?: Date; endDate?: Date }>(),
    getIncomeSuccess: props<{ income: Income[] }>(),
    setActiveCategory: props<{ categoryType: 'Expense' | 'Income' }>(),
    addCategory: props<{
      category: Category;
    }>(),
    addCategorySuccess: props<{
      category: Category;
    }>(),
    updateCategory: props<{
      category: CategoryRequest;
    }>(),
    updateCategorySuccess: props<{
      category: CategoryRequest;
    }>(),
    deleteCategory: props<{
      categoryName: string;
    }>(),
    deleteCategorySuccess: props<{
      categoryName: string;
    }>(),
  },
});
