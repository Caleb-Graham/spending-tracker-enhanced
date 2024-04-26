import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoriesViewModel } from './categories.viewmodel';
import { selectCategoriesViewModel } from '../../state/selectors/spending.selector';
import { SpendingActions } from '../../state/actions/spending.actions';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categoriesViewModel$: Observable<CategoriesViewModel> =
    new Observable<CategoriesViewModel>();

  constructor(private store: Store) {}

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
}
