import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectGroupDefectChildComponent } from './defect-group-defect-child.component';

describe('DefectGroupDefectChildComponent', () => {
  let component: DefectGroupDefectChildComponent;
  let fixture: ComponentFixture<DefectGroupDefectChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectGroupDefectChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefectGroupDefectChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
