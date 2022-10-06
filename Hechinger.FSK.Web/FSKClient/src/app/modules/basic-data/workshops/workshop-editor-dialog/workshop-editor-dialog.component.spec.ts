import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopEditorDialogComponent } from './workshop-editor-dialog.component';

describe('WorkshopEditorDialogComponent', () => {
  let component: WorkshopEditorDialogComponent;
  let fixture: ComponentFixture<WorkshopEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopEditorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
