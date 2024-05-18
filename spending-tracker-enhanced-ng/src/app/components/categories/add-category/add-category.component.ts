import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, startWith, map, combineLatest } from 'rxjs';
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
  selectedParentControl: FormControl;
  filteredOptions?: Observable<string[]>;
  categoriesViewModel$: Observable<CategoriesViewModel> =
    new Observable<CategoriesViewModel>();

  constructor(
    private dialogRef: MatDialogRef<AddCategoryComponent>,
    private store: Store
  ) {
    this.selectedParentControl = new FormControl();
  }

  ngOnInit() {
    this.categoriesViewModel$ = this.store.select(selectCategoriesViewModel);

    this.filteredOptions = combineLatest([
      this.selectedParentControl.valueChanges.pipe(startWith('')),
      this.categoriesViewModel$,
    ]).pipe(map(([value, vm]) => this.filterOptions(value, vm)));
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

  onAddCategory(categoryType: 'Expense' | 'Income') {
    const category = new Category(
      this.categoryName,
      categoryType,
      this.selectedParentControl.value
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
