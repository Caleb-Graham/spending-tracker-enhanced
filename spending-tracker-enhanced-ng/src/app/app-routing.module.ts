import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SpendingComponent } from './components/spending/spending.component';
import { NetWorthComponent } from './components/net-worth/net-worth.component';
import { SummaryComponent } from './components/summary/summary.component';
import { CategoriesComponent } from './components/categories/categories.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'spending', component: SpendingComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'net-worth', component: NetWorthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
