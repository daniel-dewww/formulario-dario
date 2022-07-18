import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGeoAutocompleteComponent } from './input-geo-autocomplete.component';

describe('InputGeoAutocompleteComponent', () => {
  let component: InputGeoAutocompleteComponent;
  let fixture: ComponentFixture<InputGeoAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputGeoAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputGeoAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
