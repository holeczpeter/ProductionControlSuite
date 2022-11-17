import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerCompareStatisticsTableComponent } from './worker-compare-statistics-table.component';

describe('WorkerCompareStatisticsTableComponent', () => {
  let component: WorkerCompareStatisticsTableComponent;
  let fixture: ComponentFixture<WorkerCompareStatisticsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerCompareStatisticsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerCompareStatisticsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
