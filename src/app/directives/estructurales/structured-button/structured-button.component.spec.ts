import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuredButtonComponent } from './structured-button.component';

describe('StructuredButtonComponent', () => {
  let component: StructuredButtonComponent;
  let fixture: ComponentFixture<StructuredButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructuredButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuredButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
