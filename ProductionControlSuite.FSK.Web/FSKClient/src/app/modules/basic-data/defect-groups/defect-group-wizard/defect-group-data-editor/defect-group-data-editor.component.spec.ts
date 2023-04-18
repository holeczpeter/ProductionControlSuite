import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectGroupDataEditorComponent } from './defect-group-data-editor.component';

describe('DefectGroupDataEditorComponent', () => {
  let component: DefectGroupDataEditorComponent;
  let fixture: ComponentFixture<DefectGroupDataEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectGroupDataEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefectGroupDataEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
