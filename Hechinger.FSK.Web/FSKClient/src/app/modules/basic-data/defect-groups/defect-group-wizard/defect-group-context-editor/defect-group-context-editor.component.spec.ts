import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectGroupContextEditorComponent } from './defect-group-context-editor.component';

describe('DefectGroupContextEditorComponent', () => {
  let component: DefectGroupContextEditorComponent;
  let fixture: ComponentFixture<DefectGroupContextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectGroupContextEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefectGroupContextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
