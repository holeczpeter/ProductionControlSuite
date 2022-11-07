import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectContextElementEditorComponent } from './defect-context-element-editor.component';

describe('DefectContextElementEditorComponent', () => {
  let component: DefectContextElementEditorComponent;
  let fixture: ComponentFixture<DefectContextElementEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectContextElementEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefectContextElementEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
