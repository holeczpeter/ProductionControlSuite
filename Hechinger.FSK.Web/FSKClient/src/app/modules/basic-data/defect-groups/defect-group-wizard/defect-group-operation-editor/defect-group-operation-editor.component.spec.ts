import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectGroupOperationEditorComponent } from './defect-group-operation-editor.component';

describe('DefectGroupOperationEditorComponent', () => {
  let component: DefectGroupOperationEditorComponent;
  let fixture: ComponentFixture<DefectGroupOperationEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectGroupOperationEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefectGroupOperationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
