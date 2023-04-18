import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationContextEditorComponent } from './operation-context-editor.component';

describe('OperationContextEditorComponent', () => {
  let component: OperationContextEditorComponent;
  let fixture: ComponentFixture<OperationContextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationContextEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationContextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
