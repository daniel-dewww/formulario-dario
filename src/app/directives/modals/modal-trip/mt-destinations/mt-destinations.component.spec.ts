import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtDestinationsComponent } from './mt-destinations.component';

describe('MtDestinationsComponent', () => {
  let component: MtDestinationsComponent;
  let fixture: ComponentFixture<MtDestinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtDestinationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MtDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
