import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCancelReasonsComponent } from './modal-cancel-reasons.component';

describe('ModalCancelReasonsComponent', () => {
  let component: ModalCancelReasonsComponent;
  let fixture: ComponentFixture<ModalCancelReasonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCancelReasonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCancelReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
