import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationEditorDialogComponent } from './operation-editor-dialog.component';

describe('OperationEditorDialogComponent', () => {
  let component: OperationEditorDialogComponent;
  let fixture: ComponentFixture<OperationEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationEditorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
