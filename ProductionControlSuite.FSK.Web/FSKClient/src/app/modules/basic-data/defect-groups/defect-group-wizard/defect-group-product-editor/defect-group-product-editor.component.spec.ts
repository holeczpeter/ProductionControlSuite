import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectGroupProductEditorComponent } from './defect-group-product-editor.component';

describe('DefectGroupProductEditorComponent', () => {
  let component: DefectGroupProductEditorComponent;
  let fixture: ComponentFixture<DefectGroupProductEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectGroupProductEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefectGroupProductEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
