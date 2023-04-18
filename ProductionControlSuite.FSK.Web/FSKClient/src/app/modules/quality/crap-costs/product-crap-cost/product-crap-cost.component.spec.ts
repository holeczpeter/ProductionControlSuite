import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCrapCostComponent } from './product-crap-cost.component';

describe('ProductCrapCostComponent', () => {
  let component: ProductCrapCostComponent;
  let fixture: ComponentFixture<ProductCrapCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCrapCostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCrapCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
