import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderAppComponent } from './placeholder-app.component';

describe('PlaceholderAppComponent', () => {
  let component: PlaceholderAppComponent;
  let fixture: ComponentFixture<PlaceholderAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceholderAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceholderAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
