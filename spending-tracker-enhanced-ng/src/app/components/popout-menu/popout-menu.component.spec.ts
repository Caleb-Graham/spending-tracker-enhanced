import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoutMenuComponent } from './popout-menu.component';

describe('PopoutMenuComponent', () => {
  let component: PopoutMenuComponent;
  let fixture: ComponentFixture<PopoutMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopoutMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopoutMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
