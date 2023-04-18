import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductContextEditorComponent } from './product-context-editor.component';

describe('ProductContextEditorComponent', () => {
  let component: ProductContextEditorComponent;
  let fixture: ComponentFixture<ProductContextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductContextEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductContextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
