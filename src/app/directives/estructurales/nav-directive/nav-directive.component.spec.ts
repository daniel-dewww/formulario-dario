import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDirectiveComponent } from './nav-directive.component';

describe('NavDirectiveComponent', () => {
  let component: NavDirectiveComponent;
  let fixture: ComponentFixture<NavDirectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavDirectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
