import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SpendingState } from './state/app.state';
import { SpendingActions } from './state/actions/spending.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isMiniMenu: boolean = false;
  constructor(private store: Store<SpendingState>) {}

  ngOnInit() {
    // * dispatch actions for inital spending app state
    this.store.dispatch(SpendingActions.getCategories());
  }

  getMenuState($event: any) {
    this.isMiniMenu = $event;
  }
}
