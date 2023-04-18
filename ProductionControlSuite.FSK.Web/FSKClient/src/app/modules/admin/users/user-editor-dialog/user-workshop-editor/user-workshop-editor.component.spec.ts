import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWorkshopEditorComponent } from './user-workshop-editor.component';

describe('UserWorkshopEditorComponent', () => {
  let component: UserWorkshopEditorComponent;
  let fixture: ComponentFixture<UserWorkshopEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWorkshopEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWorkshopEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
