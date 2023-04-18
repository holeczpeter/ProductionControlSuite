import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GualityGroupReportWeeklyChartComponent } from './guality-group-report-weekly-chart.component';

describe('GualityGroupReportWeeklyChartComponent', () => {
  let component: GualityGroupReportWeeklyChartComponent;
  let fixture: ComponentFixture<GualityGroupReportWeeklyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GualityGroupReportWeeklyChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GualityGroupReportWeeklyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
