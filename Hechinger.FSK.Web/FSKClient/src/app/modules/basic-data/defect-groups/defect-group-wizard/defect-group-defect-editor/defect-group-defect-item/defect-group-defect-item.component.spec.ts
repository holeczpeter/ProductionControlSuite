import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectGroupDefectItemComponent } from './defect-group-defect-item.component';

describe('DefectGroupDefectItemComponent', () => {
  let component: DefectGroupDefectItemComponent;
  let fixture: ComponentFixture<DefectGroupDefectItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectGroupDefectItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefectGroupDefectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
