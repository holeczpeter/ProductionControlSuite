import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityGroupReportComponent } from './quality-group-report.component';

describe('QualityGroupReportComponent', () => {
  let component: QualityGroupReportComponent;
  let fixture: ComponentFixture<QualityGroupReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityGroupReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityGroupReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
