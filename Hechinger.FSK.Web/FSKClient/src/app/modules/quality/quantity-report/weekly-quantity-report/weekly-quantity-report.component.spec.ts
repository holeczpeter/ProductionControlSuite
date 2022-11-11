import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyQuantityReportComponent } from './weekly-quantity-report.component';

describe('WeeklyQuantityReportComponent', () => {
  let component: WeeklyQuantityReportComponent;
  let fixture: ComponentFixture<WeeklyQuantityReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyQuantityReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyQuantityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
