import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryQuantityReportComponent } from './summary-quantity-report.component';

describe('SummaryQuantityReportComponent', () => {
  let component: SummaryQuantityReportComponent;
  let fixture: ComponentFixture<SummaryQuantityReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryQuantityReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryQuantityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
