import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SpendingActions } from '../actions/spending.actions';
import { of, switchMap } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category.model';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expenses.model';
import { IncomeService } from '../../services/income.service';
import { Income } from '../../models/income.model';

@Injectable()
export class SpendingEffects {
  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService,
    private expensesService: ExpenseService,
    private incomeService: IncomeService
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

  getExpenses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SpendingActions.getExpenses),
      switchMap(() => {
        return this.expensesService.getExpenses().pipe(
          switchMap((expenses: Expense[]) => {
            return of({
              type: SpendingActions.getExpensesSuccess.type,
              expenses: expenses,
            });
          })
        );
      })
    );
  });

  getIncome$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SpendingActions.getIncome),
      switchMap(() => {
        return this.incomeService.getIncome().pipe(
          switchMap((income: Income[]) => {
            return of({
              type: SpendingActions.getIncomeSuccess.type,
              income: income,
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
