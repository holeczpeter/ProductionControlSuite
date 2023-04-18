import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleUserEditorComponent } from './role-user-editor.component';

describe('RoleUserEditorComponent', () => {
  let component: RoleUserEditorComponent;
  let fixture: ComponentFixture<RoleUserEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleUserEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleUserEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
