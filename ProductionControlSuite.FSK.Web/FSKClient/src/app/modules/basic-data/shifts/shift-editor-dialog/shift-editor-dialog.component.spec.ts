import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftEditorDialogComponent } from './shift-editor-dialog.component';

describe('ShiftEditorDialogComponent', () => {
  let component: ShiftEditorDialogComponent;
  let fixture: ComponentFixture<ShiftEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftEditorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
