import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityGroupReportSummaryChartComponent } from './quality-group-report-summary-chart.component';

describe('QualityGroupReportSummaryChartComponent', () => {
  let component: QualityGroupReportSummaryChartComponent;
  let fixture: ComponentFixture<QualityGroupReportSummaryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityGroupReportSummaryChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityGroupReportSummaryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
