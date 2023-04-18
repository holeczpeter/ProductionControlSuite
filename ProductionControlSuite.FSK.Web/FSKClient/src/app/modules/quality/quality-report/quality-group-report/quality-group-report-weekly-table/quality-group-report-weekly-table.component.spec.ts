import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityGroupReportWeeklyTableComponent } from './quality-group-report-weekly-table.component';

describe('QualityGroupReportWeeklyTableComponent', () => {
  let component: QualityGroupReportWeeklyTableComponent;
  let fixture: ComponentFixture<QualityGroupReportWeeklyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityGroupReportWeeklyTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityGroupReportWeeklyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
