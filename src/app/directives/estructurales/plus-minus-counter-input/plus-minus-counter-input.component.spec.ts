import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusMinusCounterInputComponent } from './plus-minus-counter-input.component';

describe('PlusMinusCounterInputComponent', () => {
  let component: PlusMinusCounterInputComponent;
  let fixture: ComponentFixture<PlusMinusCounterInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlusMinusCounterInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlusMinusCounterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
