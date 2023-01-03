import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityReportYearlySummaryChartComponent } from './quality-report-yearly-summary-chart.component';

describe('QualityReportYearlySummaryChartComponent', () => {
  let component: QualityReportYearlySummaryChartComponent;
  let fixture: ComponentFixture<QualityReportYearlySummaryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityReportYearlySummaryChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityReportYearlySummaryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
