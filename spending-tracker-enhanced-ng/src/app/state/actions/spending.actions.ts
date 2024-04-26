import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Category } from '../../models/categories.model';

export const SpendingActions = createActionGroup({
  source: 'App',
  events: {
    getCategories: emptyProps(),
    getCategoriesSuccess: props<{ categories: Category[] }>(),
    setActiveCategory: props<{ categoryType: 'Expense' | 'Income' }>(),
    addCategory: props<{
      category: Category;
    }>(),
    addCategorySuccess: props<{
      category: Category;
    }>(),
  },
});
