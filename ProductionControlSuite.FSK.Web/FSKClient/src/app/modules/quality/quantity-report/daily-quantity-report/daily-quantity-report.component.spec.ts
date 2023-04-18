import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyQuantityReportComponent } from './daily-quantity-report.component';

describe('DailyQuantityReportComponent', () => {
  let component: DailyQuantityReportComponent;
  let fixture: ComponentFixture<DailyQuantityReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyQuantityReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyQuantityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
