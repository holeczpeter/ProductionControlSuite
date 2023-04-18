import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerCompareStatisticsChartComponent } from './worker-compare-statistics-chart.component';

describe('WorkerCompareStatisticsChartComponent', () => {
  let component: WorkerCompareStatisticsChartComponent;
  let fixture: ComponentFixture<WorkerCompareStatisticsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerCompareStatisticsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerCompareStatisticsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
