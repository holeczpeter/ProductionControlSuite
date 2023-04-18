import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopPpmChartComponent } from './workshop-ppm-chart.component';

describe('WorkshopPpmChartComponent', () => {
  let component: WorkshopPpmChartComponent;
  let fixture: ComponentFixture<WorkshopPpmChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopPpmChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopPpmChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
