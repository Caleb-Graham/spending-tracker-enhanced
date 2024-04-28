import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  provideRouter,
  withViewTransitions,
} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SpendingComponent } from './components/spending/spending.component';
import { NetWorthComponent } from './components/net-worth/net-worth.component';
import { SummaryComponent } from './components/summary/summary.component';
import { CategoriesComponent } from './components/categories/categories.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'my-spending', component: SpendingComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'net-worth', component: NetWorthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes, withViewTransitions())],
})
export class AppRoutingModule {}
