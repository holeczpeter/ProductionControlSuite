import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationQuantityChartComponent } from './operation-quantity-chart.component';

describe('OperationQuantityChartComponent', () => {
  let component: OperationQuantityChartComponent;
  let fixture: ComponentFixture<OperationQuantityChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationQuantityChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationQuantityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
