import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityReportYearlySummaryTableComponent } from './quality-report-yearly-summary-table.component';

describe('QualityReportYearlySummaryTableComponent', () => {
  let component: QualityReportYearlySummaryTableComponent;
  let fixture: ComponentFixture<QualityReportYearlySummaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityReportYearlySummaryTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityReportYearlySummaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
