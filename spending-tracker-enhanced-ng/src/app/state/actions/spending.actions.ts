import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Categories } from '../../models/categories.model';

export const SpendingActions = createActionGroup({
  source: 'App',
  events: {
    getCategories: emptyProps(),
    getCategoriesSuccess: props<{ categories: Categories[] }>(),
  },
});
