import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectEditorDialogComponent } from './defect-editor-dialog.component';

describe('DefectEditorDialogComponent', () => {
  let component: DefectEditorDialogComponent;
  let fixture: ComponentFixture<DefectEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectEditorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefectEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
