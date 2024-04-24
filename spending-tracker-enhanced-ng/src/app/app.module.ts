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
import { CategoriesComponent } from './components/categories/categories.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { PopoutMenuComponent } from './components/popout-menu/popout-menu.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Store, StoreModule } from '@ngrx/store';
import { SpendingEffects } from './state/effects/spending.effects';
import { spendingFeature } from './state/features/spending.features';
import { EffectsModule } from '@ngrx/effects';
import { SpendingActions } from './state/actions/spending.actions';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    SpendingComponent,
    SummaryComponent,
    NetWorthComponent,
    HomeComponent,
    CategoriesComponent,
    PopoutMenuComponent,
    ToolbarComponent,
    AddCategoryComponent,
  ],
  imports: [
    EffectsModule.forRoot([SpendingEffects]),
    StoreModule.forRoot({}),
    StoreModule.forFeature(spendingFeature.name, spendingFeature.reducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: false, // Restrict extension to log-only mode - may need to add this to the consumer instead of the lib.
    }),

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
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
