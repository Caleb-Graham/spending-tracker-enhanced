import { createFeature, createFeatureSelector } from '@ngrx/store';
import { SpendingState } from '../app.state';
import { spendingReducer } from '../reducers/spending.reducer';

export const featureKey = 'spending';

export const spendingFeature = createFeature({
  name: featureKey,
  reducer: spendingReducer,
});

export const { name, reducer, selectCategories, selectActiveCategory } =
  spendingFeature;

// * feature selector
export const selectSpendingFeature =
  createFeatureSelector<SpendingState>(featureKey);
