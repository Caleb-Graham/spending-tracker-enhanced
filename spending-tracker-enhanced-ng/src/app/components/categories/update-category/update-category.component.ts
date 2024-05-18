import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { Category } from '../../../models/category.model';
import { SpendingActions } from '../../../state/actions/spending.actions';
import { selectCategoriesViewModel } from '../../../state/selectors/spending.selector';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { CategoriesViewModel } from '../categories.viewmodel';
import { CategoryRequest } from '../../../models/category-request.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss',
})
export class UpdateCategoryComponent {
  categoryName: string = '';
  selectedParentControl: FormControl;
  isParentCategory: boolean = false;
  options: Category[] = [];
  categoriesViewModel$: Observable<CategoriesViewModel> =
    new Observable<CategoriesViewModel>();
  filteredOptions?: Observable<string[]>;

  constructor(
    private dialogRef: MatDialogRef<AddCategoryComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public category: Category
  ) {
    this.selectedParentControl = new FormControl();
    if (this.category.parent_Category_Name) {
      this.selectedParentControl.setValue(this.category.parent_Category_Name);
    }
  }

  ngOnInit() {
    this.categoriesViewModel$ = this.store.select(selectCategoriesViewModel);

    this.filteredOptions = combineLatest([
      this.selectedParentControl.valueChanges.pipe(startWith('')),
      this.categoriesViewModel$,
    ]).pipe(map(([value, vm]) => this.filterOptions(value, vm)));

    this.categoryName = this.category.name;
  }

  private filterOptions(value: string, vm: CategoriesViewModel): string[] {
    const filterValue = value.toLowerCase();
    const options =
      vm.activeCategory === 'Expense'
        ? vm.expenseCategories
        : vm.incomeCategories;
    return options
      .map((option) => option.name)
      .filter((option) => option.toLowerCase().includes(filterValue));
  }

  onDeleteCategory() {
    this.store.dispatch(
      SpendingActions.deleteCategory({
        categoryName: this.categoryName,
      })
    );
    this.dialogRef.close();
  }

  getSelectedOption($event: any) {
    console.log('when does this fire?');
  }

  onUpdateCategory(categoryType: 'Expense' | 'Income') {
    const category = new CategoryRequest(
      this.categoryName,
      this.category.name,
      categoryType,
      this.selectedParentControl.value
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
