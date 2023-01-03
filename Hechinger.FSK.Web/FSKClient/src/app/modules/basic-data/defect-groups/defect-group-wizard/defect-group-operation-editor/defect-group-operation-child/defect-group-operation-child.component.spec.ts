import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectGroupOperationChildComponent } from './defect-group-operation-child.component';

describe('DefectGroupOperationChildComponent', () => {
  let component: DefectGroupOperationChildComponent;
  let fixture: ComponentFixture<DefectGroupOperationChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectGroupOperationChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefectGroupOperationChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
