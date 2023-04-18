import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordEditorDialogComponent } from './change-password-editor-dialog.component';

describe('ChangePasswordEditorDialogComponent', () => {
  let component: ChangePasswordEditorDialogComponent;
  let fixture: ComponentFixture<ChangePasswordEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordEditorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
