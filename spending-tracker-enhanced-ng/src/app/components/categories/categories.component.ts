import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoriesViewModel } from './categories.viewmodel';
import { selectCategoriesViewModel } from '../../state/selectors/spending.selector';
import { SpendingActions } from '../../state/actions/spending.actions';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categoriesViewModel$: Observable<CategoriesViewModel> =
    new Observable<CategoriesViewModel>();

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit() {
    this.categoriesViewModel$ = this.store.select(selectCategoriesViewModel);
  }

  onTabChange($event: any) {
    this.store.dispatch(
      SpendingActions.setActiveCategory({
        categoryType: $event.index === 0 ? 'Expense' : 'Income',
      })
    );
  }

  openUpdateCategoryDialog(category: Category) {
    console.log('category', category);
    this.dialog.open(UpdateCategoryComponent, {
      width: '400px',
      data: category,
    });
  }
}
