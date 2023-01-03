import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityReportYearlySummaryComponent } from './quality-report-yearly-summary.component';

describe('QualityReportYearlySummaryComponent', () => {
  let component: QualityReportYearlySummaryComponent;
  let fixture: ComponentFixture<QualityReportYearlySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityReportYearlySummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityReportYearlySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
