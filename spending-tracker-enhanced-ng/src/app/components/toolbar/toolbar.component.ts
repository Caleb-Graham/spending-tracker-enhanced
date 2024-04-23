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

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  currentComponent: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.getCurrentComponent();
      });
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
}
