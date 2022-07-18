import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTripComponent } from './modal-trip.component';

describe('ModalTripComponent', () => {
  let component: ModalTripComponent;
  let fixture: ComponentFixture<ModalTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalTripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
