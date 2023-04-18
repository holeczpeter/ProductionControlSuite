import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerCompareStatisticsComponent } from './worker-compare-statistics.component';

describe('WorkerCompareStatisticsComponent', () => {
  let component: WorkerCompareStatisticsComponent;
  let fixture: ComponentFixture<WorkerCompareStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerCompareStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerCompareStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
