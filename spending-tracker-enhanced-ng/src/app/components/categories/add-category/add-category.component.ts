import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { Categories } from '../../../models/categories.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent {
  categoryName: string = '';
  parentTypeControl = new FormControl<string | Categories>('');
  options: Categories[] = [];
  filteredOptions?: Observable<Categories[]>;

  constructor(private dialogRef: MatDialogRef<AddCategoryComponent>) {}

  ngOnInit() {
    this.filteredOptions = this.parentTypeControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }

  displayFn(category: Categories): string {
    return category && category.name ? category.name : '';
  }

  private _filter(name: string): Categories[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  saveCategory() {}

  cancel() {
    this.dialogRef.close();
  }
}
