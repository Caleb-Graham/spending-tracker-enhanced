import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Tab } from '../../models/subtab.model';

@Component({
  selector: 'app-popout-menu',
  templateUrl: './popout-menu.component.html',
  styleUrl: './popout-menu.component.scss',
  animations: [
    trigger('minify', [
      state('false', style({ width: '320px' })), // needs to match the .inflow* style widths
      state('true', style({ width: '70px' })), // needs to match the .inflow* style widths
      transition('false => true', animate('200ms ease-out')),
      transition('true => false', animate('200ms ease-out')),
    ]),
    trigger('slideButton', [
      state('false', style({ transform: 'rotate(0)' })),
      state('true', style({ transform: 'rotate(180deg)' })),
      transition('false => true', animate('200ms ease-out')),
      transition('true => false', animate('200ms ease-out')),
    ]),
  ],
})
export class PopoutMenuComponent {
  @Output() minify: EventEmitter<boolean> = new EventEmitter();
  isMiniMenu: boolean = false;
  minifyTheMenu = false;
  maxifyTheContent = false;
  isPhoneSize: boolean = false;
  isTabletSize: boolean = false;
  tabs: Tab[] = [
    { tabName: 'Home', tabRoute: '' },
    { tabName: 'My Spending', tabRoute: '/my-spending' },
    { tabName: 'Categories', tabRoute: '/categories' },
    { tabName: 'Summary', tabRoute: '/summary' },
    { tabName: 'Planning', tabRoute: '/planning' },
    { tabName: 'Net Worth', tabRoute: '/net-worth' },
  ];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    // this.observer
    //   .observe(['(max-width:600px)', '(max-width:850px)'])
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((res) => {
    //     this.isPhoneSize = res.breakpoints['(max-width:600px)'];
    //     this.isTabletSize = res.breakpoints['(max-width:850px)'];
    //   });
    // this.minify.emit(this.isMiniMenu);
    // if (this.isPhoneSize) {
    //   // open with a collapsed menu if we are phone sized
    //   this.toggleMenu();
    // }
  }

  toggleMenu() {
    // dispatch instead of emit?

    this.isMiniMenu = !this.isMiniMenu;

    // this.menuService.setMenuStatus(
    //   this.isMiniMenu ? MenuStatus.mini : MenuStatus.full
    // );

    this.minifyTheMenu = this.isMiniMenu;

    this.minify.emit(this.isMiniMenu);
  }

  getClass() {
    if (this.isPhoneSize && !this.isMiniMenu) {
      return 'inflow-full-width';
    } else if (this.isMiniMenu) {
      return 'inflow-mini-menu';
    } else {
      return 'inflow';
    }
  }

  collapseSideNav() {
    // collapses side nav upon user selecting a question

    // set to navigate to (only if screen size is mobile or tablet)

    if (!!this.isPhoneSize || !!this.isTabletSize) {
      this.toggleMenu();
    }
  }
}
