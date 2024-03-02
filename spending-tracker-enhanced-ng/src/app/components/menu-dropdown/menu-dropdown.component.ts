import { Component, Input, Renderer2 } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-menu-dropdown',
  templateUrl: './menu-dropdown.component.html',
  styleUrl: './menu-dropdown.component.scss',
})
export class MenuDropdownComponent {
  @Input() tabName: string = '';
  @Input() subTabs: string[] = [];
  enteredButton = false;
  isMatMenuOpen = false;
  prevButtonTrigger: MatMenuTrigger | undefined;

  constructor(private ren: Renderer2) {}

  menuenter() {
    this.isMatMenuOpen = true;
  }

  menuLeave(trigger: MatMenuTrigger, button: any) {
    setTimeout(() => {
      if (!this.enteredButton) {
        this.isMatMenuOpen = false;
        trigger.closeMenu();
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      } else {
        this.isMatMenuOpen = false;
      }
    }, 80);
  }

  buttonEnter(trigger: MatMenuTrigger) {
    setTimeout(() => {
      if (this.prevButtonTrigger && this.prevButtonTrigger != trigger) {
        this.prevButtonTrigger.closeMenu();
        this.prevButtonTrigger = trigger;
        this.isMatMenuOpen = false;
        trigger.openMenu();
      } else if (!this.isMatMenuOpen) {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
        trigger.openMenu();
      } else {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
      }
    });
  }

  buttonLeave(trigger: MatMenuTrigger, button: any) {
    setTimeout(() => {
      if (this.enteredButton && !this.isMatMenuOpen) {
        trigger.closeMenu();
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      }
      if (!this.isMatMenuOpen) {
        trigger.closeMenu();
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
      } else {
        this.enteredButton = false;
      }
    }, 100);
  }
}
