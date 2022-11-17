import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerDefectStatisticsTableComponent } from './worker-defect-statistics-table.component';

describe('WorkerDefectStatisticsTableComponent', () => {
  let component: WorkerDefectStatisticsTableComponent;
  let fixture: ComponentFixture<WorkerDefectStatisticsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerDefectStatisticsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerDefectStatisticsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
