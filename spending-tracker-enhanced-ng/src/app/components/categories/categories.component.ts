import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CategoriesViewModel } from './categories.viewmodel';
import { selectCategoriesViewModel } from '../../state/selectors/spending.selector';
import { SpendingActions } from '../../state/actions/spending.actions';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { Category } from '../../models/category.model';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

interface CategoryNode {
  name: string;
  children?: CategoryNode[];
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categoriesViewModel$: Observable<CategoriesViewModel> =
    new Observable<CategoriesViewModel>();

  treeControl = new NestedTreeControl<CategoryNode>((node) => node.children);
  expenseDataSource = new MatTreeNestedDataSource<CategoryNode>();
  incomeDataSource = new MatTreeNestedDataSource<CategoryNode>();

  unsubscribe$ = new Subject<void>();

  constructor(private store: Store, public dialog: MatDialog) {}

  ngOnInit() {
    this.categoriesViewModel$ = this.store.select(selectCategoriesViewModel);
    this.store
      .select(selectCategoriesViewModel)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((x) => {
        this.expenseDataSource.data = this.createCategoryTreeStructure(
          x.expenseCategories
        );
        this.incomeDataSource.data = this.createCategoryTreeStructure(
          x.incomeCategories
        );
      });
  }

  hasChild = (_: number, node: CategoryNode) =>
    !!node.children && node.children.length > 0;

  createCategoryTreeStructure(categories: Category[]): CategoryNode[] {
    const categoryMap: Map<string, CategoryNode> = new Map();

    // Initialize nodes and populate the map
    categories.forEach((category) => {
      categoryMap.set(category.name, { name: category.name, children: [] });
    });

    // Build the tree structure
    const tree: CategoryNode[] = [];

    categories.forEach((category) => {
      const node = categoryMap.get(category.name);

      if (category.parent_Category_Name) {
        const parentNode = categoryMap.get(category.parent_Category_Name);
        if (parentNode) {
          parentNode.children = parentNode.children || [];
          parentNode.children.push(node!);
        }
      } else {
        tree.push(node!);
      }
    });

    return tree;
  }

  onTabChange($event: any) {
    this.store.dispatch(
      SpendingActions.setActiveCategory({
        categoryType: $event.index === 0 ? 'Expense' : 'Income',
      })
    );
  }

  openUpdateCategoryDialog(categoryName: string, categories: Category[]) {
    const category = categories.find((c) => c.name == categoryName);

    this.dialog.open(UpdateCategoryComponent, {
      width: '400px',
      data: category,
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
