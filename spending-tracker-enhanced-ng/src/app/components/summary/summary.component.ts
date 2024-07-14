import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ScaleType } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs';
import { selectChartsViewModel } from '../../state/selectors/spending.selector';
import { SummaryViewModel } from './summary.viewmodel';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnInit {
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

  incomeTotalPercent: number = 0;
  incomeTotalAmount: number = 0;

  expenseTotalPercent: number = 0;
  expenseTotalAmount: number = 0;

  categoryTotalPercent: number = 0;
  categoryTotalAmount: number = 0;

  chartsViewModel$: Observable<SummaryViewModel> =
    new Observable<SummaryViewModel>();

  constructor(private store: Store, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.chartsViewModel$ = this.store.select(selectChartsViewModel);

    this.chartsViewModel$.subscribe((data: SummaryViewModel) => {
      if (data && data.expensePieChart) {
        this.colorScheme.domain = this.generateColorScheme(
          data.expensePieChart.length
        );
      }

      this.calculateIncomeTotals(data);
      this.calculateExpenseTotals(data);
      this.calculateCategoryTotals(data);
    });

    // this.setSankeyData();
  }

  ngAfterViewChecked() {
    // Manually detect changes
    this.cdRef.detectChanges();
  }

  calculateIncomeTotals(vm: SummaryViewModel) {
    this.incomeTotalPercent = vm.childExpenses.reduce(
      (acc, income) => acc + income.percent_Of_Total,
      0
    );
    this.incomeTotalAmount = vm.childExpenses.reduce(
      (acc, income) => acc + income.total_Amount,
      0
    );
  }

  calculateExpenseTotals(vm: SummaryViewModel) {
    this.expenseTotalPercent = vm.childExpenses.reduce(
      (acc, expense) => acc + expense.percent_Of_Total,
      0
    );
    this.expenseTotalAmount = vm.childExpenses.reduce(
      (acc, expense) => acc + expense.total_Amount,
      0
    );
  }

  calculateCategoryTotals(vm: SummaryViewModel) {
    this.categoryTotalPercent = vm.parentExpenses.reduce(
      (acc, category) => acc + category.percent_Of_Total,
      0
    );
    this.categoryTotalAmount = vm.parentExpenses.reduce(
      (acc, category) => acc + category.total_Amount,
      0
    );
  }

  generateColorScheme(numberOfSlices: number): string[] {
    const startColor = '#0418c9'; // Dark blue
    const endColor = '#bde0f2'; // Light blue

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
