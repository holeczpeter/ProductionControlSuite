import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMenuEditorComponent } from './role-menu-editor.component';

describe('RoleMenuEditorComponent', () => {
  let component: RoleMenuEditorComponent;
  let fixture: ComponentFixture<RoleMenuEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleMenuEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleMenuEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
