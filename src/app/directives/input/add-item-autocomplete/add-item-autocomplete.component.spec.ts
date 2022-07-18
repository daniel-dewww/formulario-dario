import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemAutocompleteComponent } from './add-item-autocomplete.component';

describe('AddItemAutocompleteComponent', () => {
  let component: AddItemAutocompleteComponent;
  let fixture: ComponentFixture<AddItemAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItemAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
