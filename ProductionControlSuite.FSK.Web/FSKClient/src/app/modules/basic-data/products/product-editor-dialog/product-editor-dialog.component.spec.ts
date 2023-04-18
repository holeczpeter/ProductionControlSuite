import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditorDialogComponent } from './product-editor-dialog.component';

describe('ProductEditorDialogComponent', () => {
  let component: ProductEditorDialogComponent;
  let fixture: ComponentFixture<ProductEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductEditorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
