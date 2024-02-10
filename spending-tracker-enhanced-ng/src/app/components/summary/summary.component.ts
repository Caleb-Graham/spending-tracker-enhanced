import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { ExpenseModel } from '../../models/expenses.model';
import { IncomeService } from '../../services/income.service';
import { ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnInit {
  expenses?: ExpenseModel[];
  income?: ExpenseModel[];
  expensePieChartData: any[] = [];
  incomePieChartData: any[] = [];
  view: [number, number] = [900, 750];

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
  sankeyData = [
    { source: 'United States Of America', target: 'Japan', value: 50 },
    { source: 'Germany', target: 'Japan', value: 80 },
    { source: 'Germany', target: 'South Korea', value: 25 },
    { source: 'France', target: 'South Korea', value: 30 },
    { source: 'France', target: 'Italy', value: 10 },
    { source: 'France', target: 'North Macedonia', value: 15 },
    { source: 'India', target: 'Japan', value: 10 },
    { source: 'Japan', target: 'UK', value: 60 },
    { source: 'Japan', target: 'UK', value: 10 },
    {
      source: 'Japan',
      target: 'Democratic Republic of São Tomé and Príncipe',
      value: 50,
    },
    { source: 'Japan', target: 'Republic of Equatorial Guinea', value: 20 },
    { source: 'South Korea', target: 'UK', value: 55 },
    { source: 'Italy', target: 'UK', value: 10 },
    {
      source: 'North Macedonia',
      target: 'Republic of Equatorial Guinea',
      value: 15,
    },
    {
      source: 'UK',
      target: 'Independent and the Sovereign Republic of Kiribati',
      value: 10,
    },
    {
      source: 'UK',
      target: 'Commonwealth of the Northern Mariana Islands',
      value: 60,
    },
    { source: 'UK', target: 'Bosnia and Herzegovina', value: 25 },
    { source: 'UK', target: 'Spain', value: 20 },
    { source: 'UK', target: 'Bosnia and Herzegovina', value: 20 },
    {
      source: 'Republic of Equatorial Guinea',
      target: 'Republic of Costa Rica',
      value: 30,
    },
    { source: 'Republic of Equatorial Guinea', target: 'Portugal', value: 5 },
  ];

  constructor(
    private expenseService: ExpenseService,
    private incomeService: IncomeService
  ) {}

  ngOnInit() {
    this.expenseService.getExpenses().subscribe((expenses) => {
      this.expenses = expenses;

      this.expensePieChartData = this.expenses.map((expense) => ({
        name: expense.category_Name,
        value: Math.abs(expense.total_Amount),
      }));
    });

    this.incomeService.getIncome().subscribe((income) => {
      console.log('og income', income);
      this.income = income;

      this.incomePieChartData = this.income.map((income) => ({
        name: income.category_Name,
        value: Math.abs(income.total_Amount),
      }));
      console.log('transformed income', this.incomePieChartData);
    });
  }

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
