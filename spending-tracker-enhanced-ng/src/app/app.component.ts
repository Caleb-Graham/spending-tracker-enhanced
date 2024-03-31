import { Component } from '@angular/core';
import { CSVService } from './services/csv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isMiniMenu: boolean = false;
  constructor() {}

  getMenuState($event: any) {
    this.isMiniMenu = $event;
  }
}
