import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityReportComponent } from './quantity-report.component';

describe('QuantityReportComponent', () => {
  let component: QuantityReportComponent;
  let fixture: ComponentFixture<QuantityReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantityReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
