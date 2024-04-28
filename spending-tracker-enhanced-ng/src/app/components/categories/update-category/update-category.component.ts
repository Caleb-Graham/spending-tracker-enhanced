import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '../../../models/category.model';
import { SpendingActions } from '../../../state/actions/spending.actions';
import { selectCategoriesViewModel } from '../../../state/selectors/spending.selector';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { CategoriesViewModel } from '../categories.viewmodel';
import { CategoryRequest } from '../../../models/category-request.model';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss',
})
export class UpdateCategoryComponent {
  categoryName: string = '';
  selectedParent: any;
  options: Category[] = [];
  categoriesViewModel$: Observable<CategoriesViewModel> =
    new Observable<CategoriesViewModel>();

  constructor(
    private dialogRef: MatDialogRef<AddCategoryComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public category: Category
  ) {}

  ngOnInit() {
    this.categoriesViewModel$ = this.store.select(selectCategoriesViewModel);
    this.categoryName = this.category.name;
  }

  displayFn(category: Category): string {
    return category && category.name ? category.name : '';
  }

  onDeleteCategory() {
    this.store.dispatch(
      SpendingActions.deleteCategory({
        categoryName: this.categoryName,
      })
    );
    this.dialogRef.close();
  }

  getSelectedOption($event: any) {}

  onUpdateCategory(
    categoryType: 'Expense' | 'Income',
    selectedParentID: number | undefined
  ) {
    const category = new CategoryRequest(
      this.categoryName,
      this.category.name,
      categoryType,
      selectedParentID
    );

    this.store.dispatch(
      SpendingActions.updateCategory({
        category,
      })
    );
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
