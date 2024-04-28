import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { CategoriesViewModel } from '../categories.viewmodel';
import { selectCategoriesViewModel } from '../../../state/selectors/spending.selector';
import { SpendingActions } from '../../../state/actions/spending.actions';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent {
  categoryName: string = '';
  selectedParent: any;
  options: Category[] = [];
  categoriesViewModel$: Observable<CategoriesViewModel> =
    new Observable<CategoriesViewModel>();

  constructor(
    private dialogRef: MatDialogRef<AddCategoryComponent>,
    private store: Store
  ) {}

  ngOnInit() {
    this.categoriesViewModel$ = this.store.select(selectCategoriesViewModel);
  }

  displayFn(category: Category): string {
    return category && category.name ? category.name : '';
  }

  onAddCategory(
    categoryType: 'Expense' | 'Income',
    selectedParentID: number | undefined
  ) {
    const category = new Category(
      this.categoryName,
      categoryType,
      selectedParentID
    );

    this.store.dispatch(
      SpendingActions.addCategory({
        category,
      })
    );
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
