import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SummaryComponent } from './summary/summary.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: HomeComponent,
            },
            {
                path: 'summary', 
                component: SummaryComponent
            }
        ]
    }
];
