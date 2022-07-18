import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportServiceCardComponent } from './report-service-card.component';

describe('ReportServiceCardComponent', () => {
  let component: ReportServiceCardComponent;
  let fixture: ComponentFixture<ReportServiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportServiceCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportServiceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
