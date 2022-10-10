import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityAssuranceTableComponent } from './quality-assurance-table.component';

describe('QualityAssuranceTableComponent', () => {
  let component: QualityAssuranceTableComponent;
  let fixture: ComponentFixture<QualityAssuranceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityAssuranceTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityAssuranceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
