import { createReducer, on } from '@ngrx/store';
import { SpendingState } from '../app.state';
import { SpendingActions } from '../actions/spending.actions';

export const initalState: SpendingState = {
  categories: [],
  activeCategory: 'Expense',
};

export const spendingReducer = createReducer(
  initalState,

  // * sets category state
  on(SpendingActions.getCategoriesSuccess, (state, { categories }) => {
    return {
      ...state,
      categories: categories,
    };
  }),

  // * sets category state
  on(SpendingActions.setActiveCategory, (state, { categoryType }) => {
    return {
      ...state,
      activeCategory: categoryType,
    };
  }),

  // * adds category to state
  on(SpendingActions.addCategorySuccess, (state, { category }) => {
    return {
      ...state,
      categories: [...state.categories, category],
    };
  })
);
