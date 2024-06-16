import { createReducer, on } from '@ngrx/store';
import { SpendingState } from '../app.state';
import { SpendingActions } from '../actions/spending.actions';

export const initalState: SpendingState = {
  categories: [],
  parentExpenses: [],
  childExpenses: [],
  parentIncome: [],
  childIncome: [],
  activeCategory: 'Expense',
};

export const spendingReducer = createReducer(
  initalState,

  // * sets expenses state
  on(
    SpendingActions.getExpensesSuccess,
    (state, { parentExpenses, childExpenses }) => {
      return {
        ...state,
        parentExpenses: parentExpenses,
        childExpenses: childExpenses,
      };
    }
  ),

  // * sets income state
  on(
    SpendingActions.getIncomeSuccess,
    (state, { parentIncome, childIncome }) => {
      return {
        ...state,
        parentIncome: parentIncome,
        childIncome: childIncome,
      };
    }
  ),

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
  }),

  // * updates category in state
  on(SpendingActions.updateCategorySuccess, (state, { category }) => {
    const updatedCategories = state.categories.map((existingCategory) => {
      // Check if the category names match
      if (existingCategory.name === category.oldCategoryName) {
        // If the names match, update the category
        return category;
      }
      // If the names don't match, return the existing category unchanged
      return existingCategory;
    });

    return {
      ...state,
      categories: updatedCategories,
    };
  }),

  // * deletes category from state
  on(SpendingActions.deleteCategorySuccess, (state, { categoryName }) => {
    const updatedCategories = state.categories.filter(
      (existingCategory) => existingCategory.name !== categoryName
    );

    return {
      ...state,
      categories: updatedCategories,
    };
  })
);
