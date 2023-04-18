import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectGroupDefectEditorComponent } from './defect-group-defect-editor.component';

describe('DefectGroupDefectEditorComponent', () => {
  let component: DefectGroupDefectEditorComponent;
  let fixture: ComponentFixture<DefectGroupDefectEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectGroupDefectEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefectGroupDefectEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
