import { Component } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';
import { filter } from 'rxjs';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { AddCategoryComponent } from '../categories/add-category/add-category.component';
import { Store } from '@ngrx/store';
import { SpendingActions } from '../../state/actions/spending.actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  currentComponent: string = '';
  selectedChartsDateValue: string = 'ytd';
  startDate: Date | undefined;
  endDate: Date | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getCurrentComponent();
      });

    this.handleOptionChange(this.selectedChartsDateValue);
  }

  getCurrentComponent(): void {
    let route = this.activatedRoute.snapshot;
    while (route.firstChild) {
      route = route.firstChild;
    }
    this.currentComponent = this.getComponentName(route);
    // Now you have the name of the current component, you can use it to determine what data to display in the toolbar
  }

  getComponentName(route: ActivatedRouteSnapshot): string {
    // Handle cases where route.component can be null
    if (route.component) {
      return this.transformComponentName(route.component.name);
    } else if (route.routeConfig && route.routeConfig.component) {
      // Fallback to routeConfig if component is not directly specified
      return this.transformComponentName(route.routeConfig.component.name);
    } else {
      // Unable to determine component name
      return 'UnknownComponent';
    }
  }

  transformComponentName(name: string): string {
    // Strip off leading underscore (_) and "Component"
    return name.replace(/^_(.*)Component$/, '$1').toLowerCase();
  }

  openAddCategoryDialog() {
    this.dialog.open(AddCategoryComponent, {
      width: '400px',
    });
  }

  handleOptionChange(option: string) {
    const today = new Date();

    switch (option) {
      case '30Days':
        this.startDate = this.getStartDate(30);
        this.endDate = today;
        break;
      case '90Days':
        this.startDate = this.getStartDate(90);
        this.endDate = today;
        break;
      case 'ytd':
        this.startDate = new Date(today.getFullYear(), 0, 1);
        this.endDate = today;
        break;
      case '1Year':
        this.startDate = new Date(
          today.getFullYear() - 1,
          today.getMonth(),
          today.getDate()
        );
        this.endDate = today;
        break;
      case 'lastYear':
        const lastYearStart = new Date(today.getFullYear() - 1, 0, 1);
        const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31);
        this.startDate = lastYearStart;
        this.endDate = lastYearEnd;
        break;
      case 'custom':
        break;
    }

    if (this.startDate && this.endDate) {
      this.store.dispatch(
        SpendingActions.getExpenses({
          startDate: this.startDate,
          endDate: this.endDate,
        })
      );
      this.store.dispatch(
        SpendingActions.getIncome({
          startDate: this.startDate,
          endDate: this.endDate,
        })
      );
    }
  }

  getStartDate(numDays: number): Date {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - numDays);
    return startDate;
  }
}
