import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtHeaderComponent } from './mt-header.component';

describe('MtHeaderComponent', () => {
  let component: MtHeaderComponent;
  let fixture: ComponentFixture<MtHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MtHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
