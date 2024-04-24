import { createReducer, on } from '@ngrx/store';
import { SpendingState } from '../app.state';
import { SpendingActions } from '../actions/spending.actions';

export const initalState: SpendingState = {
  categories: [],
};

export const spendingReducer = createReducer(
  initalState,

  // * sets category state
  on(SpendingActions.getCategoriesSuccess, (state, { categories }) => {
    return {
      ...state,
      categories: categories,
    };
  })
);
