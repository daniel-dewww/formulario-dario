import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCountryCodeComponent } from './select-country-code.component';

describe('SelectCountryCodeComponent', () => {
  let component: SelectCountryCodeComponent;
  let fixture: ComponentFixture<SelectCountryCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCountryCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCountryCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
