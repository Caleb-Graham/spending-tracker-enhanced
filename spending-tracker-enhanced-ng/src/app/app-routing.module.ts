import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BudgetComponent } from './components/budget/budget.component';
import { NetWorthComponent } from './components/net-worth/net-worth.component';
import { SummaryComponent } from './components/summary/summary.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'net-worth', component: NetWorthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
