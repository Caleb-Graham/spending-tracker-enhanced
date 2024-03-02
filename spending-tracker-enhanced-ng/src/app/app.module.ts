import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { SpendingComponent } from './components/spending/spending.component';
import { SummaryComponent } from './components/summary/summary.component';
import { NetWorthComponent } from './components/net-worth/net-worth.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MenuDropdownComponent } from './components/menu-dropdown/menu-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    SpendingComponent,
    SummaryComponent,
    NetWorthComponent,
    HomeComponent,
    ToolbarComponent,
    CategoriesComponent,
    MenuDropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    NgxChartsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
