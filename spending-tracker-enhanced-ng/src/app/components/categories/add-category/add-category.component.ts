import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { Category } from '../../../models/categories.model';
import { Store } from '@ngrx/store';
import { CategoriesViewModel } from '../categories.viewmodel';
import { selectCategoriesViewModel } from '../../../state/selectors/spending.selector';
import { SpendingActions } from '../../../state/actions/spending.actions';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent {
  categoryName: string = '';
  // parentTypeControl: FormControl<Categories> = new FormControl<Categories>();
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

  onAddCategory(categoryType: 'Expense' | 'Income') {
    console.log('categoryName', categoryType);
    const category = {
      name: this.categoryName,
      type: categoryType,
      parent_category_id: this.selectedParent
        ? this.selectedParent.parent_Category_ID
        : null,
    };
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
