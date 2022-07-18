import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastButtonComponent } from './toast-button.component';

describe('ToastButtonComponent', () => {
  let component: ToastButtonComponent;
  let fixture: ComponentFixture<ToastButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToastButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
