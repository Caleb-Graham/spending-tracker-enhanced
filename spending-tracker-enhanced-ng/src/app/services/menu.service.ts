import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { MenuStatus } from '../enums/menu-status.enum';

@Injectable({
  providedIn: 'root',
})

/*

  Used in conjunction with the header component and it's menu.

*/
export class MenuService {
  //   private menuItemsSubject: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([]);

  //   private accountMenuItemsSubject: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([]);

  //   public menuItems: Observable<MenuItem[]> = this.menuItemsSubject.asObservable();

  //   public accountMenuItems: Observable<MenuItem[]> = this.accountMenuItemsSubject.asObservable();

  //   public setMenuItems(items: MenuItem[]) {

  //     this.menuItemsSubject.next(items);

  //   }

  //   public setAccountMenuItems(items: MenuItem[]) {

  //     this.accountMenuItemsSubject.next(items);

  //   }

  private menuStatusSubject: BehaviorSubject<MenuStatus> =
    new BehaviorSubject<MenuStatus>(MenuStatus.full);

  public menuStatus: Observable<MenuStatus> =
    this.menuStatusSubject.asObservable();

  public setMenuStatus(newStatus: MenuStatus) {
    this.menuStatusSubject.next(newStatus);
  }

  public getMenuStatus(): MenuStatus {
    return this.menuStatusSubject.value;
  }
}
