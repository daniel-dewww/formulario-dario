import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgStepComponent } from './ng-step.component';

describe('NgStepComponent', () => {
  let component: NgStepComponent;
  let fixture: ComponentFixture<NgStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
