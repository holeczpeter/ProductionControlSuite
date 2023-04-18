import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectContextEditorComponent } from './defect-context-editor.component';

describe('DefectContextEditorComponent', () => {
  let component: DefectContextEditorComponent;
  let fixture: ComponentFixture<DefectContextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectContextEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefectContextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
