import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTripHistoryComponent } from './modal-trip-history.component';

describe('ModalTripHistoryComponent', () => {
  let component: ModalTripHistoryComponent;
  let fixture: ComponentFixture<ModalTripHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTripHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTripHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
