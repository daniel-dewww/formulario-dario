import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgNavComponent } from './ng-nav.component';

describe('NgNavComponent', () => {
  let component: NgNavComponent;
  let fixture: ComponentFixture<NgNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
