import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanciaPrecioComponent } from './financia-precio.component';

describe('FinanciaPrecioComponent', () => {
  let component: FinanciaPrecioComponent;
  let fixture: ComponentFixture<FinanciaPrecioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanciaPrecioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanciaPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
