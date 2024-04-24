import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SpendingActions } from '../actions/spending.actions';
import { of, switchMap } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import { Categories } from '../../models/categories.model';

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
          switchMap((categories: Categories[]) => {
            return of({
              type: SpendingActions.getCategoriesSuccess.type,
              categories: categories,
            });
          })
        );
      })
    );
  });
}
