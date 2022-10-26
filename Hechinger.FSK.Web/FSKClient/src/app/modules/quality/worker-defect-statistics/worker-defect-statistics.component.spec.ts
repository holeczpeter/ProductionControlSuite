import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerDefectStatisticsComponent } from './worker-defect-statistics.component';

describe('WorkerDefectStatisticsComponent', () => {
  let component: WorkerDefectStatisticsComponent;
  let fixture: ComponentFixture<WorkerDefectStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerDefectStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerDefectStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
