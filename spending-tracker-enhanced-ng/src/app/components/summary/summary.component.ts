import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense-service';
import { ExpenseModel } from '../../models/expenses.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnInit {
  expenses?: ExpenseModel[];
  expensePieChartData: any[] = [];
  view: [number, number] = [1000, 750];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: any = 'below';

  colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.expenseService.getExpenses().subscribe((expenses) => {
      console.log('og expense', expenses);
      this.expenses = expenses;

      this.expensePieChartData = this.expenses.map((expense) => ({
        name: expense.category_Name,
        value: Math.abs(expense.total_Amount),
      }));
      console.log('transformed expenses', this.expensePieChartData);
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
