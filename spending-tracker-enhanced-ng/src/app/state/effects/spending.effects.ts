import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SpendingActions } from '../actions/spending.actions';
import { of, switchMap } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category.model';

@Injectable()
export class SpendingEffects {
  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService
  ) {}

  getCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SpendingActions.getCategories),
      switchMap(() => {
        return this.categoriesService.getCategories().pipe(
          switchMap((categories: Category[]) => {
            return of({
              type: SpendingActions.getCategoriesSuccess.type,
              categories: categories,
            });
          })
        );
      })
    );
  });

  addCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SpendingActions.addCategory),
      switchMap((action) => {
        return this.categoriesService.addCategory(action.category).pipe(
          switchMap(() => {
            return of({
              type: SpendingActions.addCategorySuccess.type,
              category: action.category,
            });
          })
        );
      })
    );
  });

  updateCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SpendingActions.updateCategory),
      switchMap((action) => {
        return this.categoriesService.updateCategory(action.category).pipe(
          switchMap(() => {
            return of({
              type: SpendingActions.updateCategorySuccess.type,
              category: action.category,
            });
          })
        );
      })
    );
  });

  deleteCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SpendingActions.deleteCategory),
      switchMap((action) => {
        return this.categoriesService.deleteCategory(action.categoryName).pipe(
          switchMap(() => {
            return of({
              type: SpendingActions.deleteCategorySuccess.type,
              categoryName: action.categoryName,
            });
          })
        );
      })
    );
  });
}
