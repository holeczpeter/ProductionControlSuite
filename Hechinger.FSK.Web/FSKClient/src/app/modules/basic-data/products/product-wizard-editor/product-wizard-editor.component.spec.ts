import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWizardEditorComponent } from './product-wizard-editor.component';

describe('ProductWizardEditorComponent', () => {
  let component: ProductWizardEditorComponent;
  let fixture: ComponentFixture<ProductWizardEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductWizardEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductWizardEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
