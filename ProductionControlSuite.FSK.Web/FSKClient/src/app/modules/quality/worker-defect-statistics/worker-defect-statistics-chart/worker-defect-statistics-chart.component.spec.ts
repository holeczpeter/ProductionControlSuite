import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerDefectStatisticsChartComponent } from './worker-defect-statistics-chart.component';

describe('WorkerDefectStatisticsChartComponent', () => {
  let component: WorkerDefectStatisticsChartComponent;
  let fixture: ComponentFixture<WorkerDefectStatisticsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerDefectStatisticsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerDefectStatisticsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
