import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrapCostChartComponent } from './crap-cost-chart.component';

describe('CrapCostChartComponent', () => {
  let component: CrapCostChartComponent;
  let fixture: ComponentFixture<CrapCostChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrapCostChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrapCostChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
