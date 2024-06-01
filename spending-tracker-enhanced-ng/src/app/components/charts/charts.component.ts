import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expenses.model';
import { IncomeService } from '../../services/income.service';
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
  // expenses?: Expense[];
  // income?: Expense[];
  // expensePieChartData: any[] = [];
  // incomePieChartData: any[] = [];
  view: [number, number] = [1500, 750];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'below';

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  animations: boolean = true;
  tooltipDisabled = false;
  customColors: any[] = [
    {
      name: 'Germany',
      value: '#a8385d',
    },
  ];
  schemeType = ScaleType.Ordinal;
  sankeyData: any = [];

  chartsViewModel$: Observable<ChartsViewModel> =
    new Observable<ChartsViewModel>();

  constructor(
    private expenseService: ExpenseService,
    private incomeService: IncomeService,
    private store: Store
  ) {}

  ngOnInit() {
    this.chartsViewModel$ = this.store.select(selectChartsViewModel);
    // this.expenseService.getExpenses().subscribe((expenses) => {
    //   this.expenses = expenses;

    //   this.expensePieChartData = this.expenses.map((expense) => ({
    //     name: expense.category_Name,
    //     value: Math.abs(expense.total_Amount),
    //   }));
    //   console.log('transformed expenses', this.expensePieChartData);
    // });

    // this.incomeService.getIncome().subscribe((income) => {
    //   this.income = income;

    //   this.incomePieChartData = this.income.map((income) => ({
    //     name: income.category_Name,
    //     value: Math.abs(income.total_Amount),
    //   }));
    //   console.log('transformed income', this.incomePieChartData);
    // });

    // this.setSankeyData();
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
