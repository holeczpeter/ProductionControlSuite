import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopCrapCostChartComponent } from './workshop-crap-cost-chart.component';

describe('WorkshopCrapCostChartComponent', () => {
  let component: WorkshopCrapCostChartComponent;
  let fixture: ComponentFixture<WorkshopCrapCostChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopCrapCostChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopCrapCostChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
