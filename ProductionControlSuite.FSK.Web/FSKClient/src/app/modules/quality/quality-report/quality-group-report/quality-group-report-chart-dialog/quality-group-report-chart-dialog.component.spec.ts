import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityGroupReportChartDialogComponent } from './quality-group-report-chart-dialog.component';

describe('QualityGroupReportChartDialogComponent', () => {
  let component: QualityGroupReportChartDialogComponent;
  let fixture: ComponentFixture<QualityGroupReportChartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityGroupReportChartDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityGroupReportChartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
