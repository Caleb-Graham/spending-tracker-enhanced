import { createSelector } from '@ngrx/store';
import {
  selectActiveCategory,
  selectCategories,
} from '../features/spending.features';
import { CategoriesViewModel } from '../../components/categories/categories.viewmodel';

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
