import { Component, OnInit } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';
import { ChartsViewModel } from './charts.viewmodel';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectChartsViewModel } from '../../state/selectors/spending.selector';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent implements OnInit {
  view: [number, number] = [1500, 750];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'below';

  colorScheme: any = {
    domain: [],
  };

  animations: boolean = true;
  tooltipDisabled = false;
  schemeType = ScaleType.Ordinal;
  sankeyData: any = [];

  chartsViewModel$: Observable<ChartsViewModel> =
    new Observable<ChartsViewModel>();

  constructor(private store: Store) {}

  ngOnInit() {
    this.chartsViewModel$ = this.store.select(selectChartsViewModel);

    this.chartsViewModel$.subscribe((data: ChartsViewModel) => {
      if (data && data.expensePieChart) {
        this.colorScheme.domain = this.generateColorScheme(
          data.expensePieChart.length
        );
      }
    });

    // this.setSankeyData();
  }

  generateColorScheme(numberOfSlices: number): string[] {
    const startColor = '#0050a0'; // Dark blue
    const endColor = '#b0c4de'; // Light blue

    const gradientColors = [];

    // Calculate the step for the gradient
    const step = 1 / numberOfSlices;

    // Generate gradient colors
    for (let i = 0; i < numberOfSlices; i++) {
      const interpolatedColor = this.interpolateColor(
        startColor,
        endColor,
        i * step
      );
      gradientColors.push(interpolatedColor);
    }

    return gradientColors;
  }

  // Function to interpolate color
  interpolateColor(
    startColor: string,
    endColor: string,
    ratio: number
  ): string {
    const r = Math.ceil(
      parseInt(startColor.slice(1, 3), 16) * (1 - ratio) +
        parseInt(endColor.slice(1, 3), 16) * ratio
    );
    const g = Math.ceil(
      parseInt(startColor.slice(3, 5), 16) * (1 - ratio) +
        parseInt(endColor.slice(3, 5), 16) * ratio
    );
    const b = Math.ceil(
      parseInt(startColor.slice(5, 7), 16) * (1 - ratio) +
        parseInt(endColor.slice(5, 7), 16) * ratio
    );

    return `#${this.componentToHex(r)}${this.componentToHex(
      g
    )}${this.componentToHex(b)}`;
  }

  componentToHex(c: number): string {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }

  // setSankeyData() {
  //   this.sankeyData = [];
  //   if (!!this.income && this.income.length > 0) {
  //     for (let index = 0; index < this.income.length; index++) {
  //       const incomeItem = this.income[index];

  //       this.sankeyData.push({
  //         source: incomeItem.category_Name,
  //         target: 'Income',
  //         value: incomeItem.total_Amount,
  //       });
  //     }
  //   }

  //   if (!!this.expenses && this.expenses.length > 0) {
  //     for (let index = 0; index < this.expenses.length; index++) {
  //       const expensesItem = this.expenses[index];

  //       this.sankeyData.push({
  //         source: 'Income',
  //         target: expensesItem.category_Name,
  //         value: Math.abs(expensesItem.total_Amount),
  //       });
  //       console.log('sakey data', this.sankeyData);
  //     }
  //   }
  // }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
