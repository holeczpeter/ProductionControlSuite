import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleEditorDialogComponent } from './role-editor-dialog.component';

describe('RoleEditorDialogComponent', () => {
  let component: RoleEditorDialogComponent;
  let fixture: ComponentFixture<RoleEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleEditorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
