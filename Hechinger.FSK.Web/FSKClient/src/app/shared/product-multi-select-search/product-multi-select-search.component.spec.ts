import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMultiSelectSearchComponent } from './product-multi-select-search.component';

describe('ProductMultiSelectSearchComponent', () => {
  let component: ProductMultiSelectSearchComponent;
  let fixture: ComponentFixture<ProductMultiSelectSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMultiSelectSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductMultiSelectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
