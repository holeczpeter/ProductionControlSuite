import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesLegendComponent } from './categories-legend.component';

describe('CategoriesLegendComponent', () => {
  let component: CategoriesLegendComponent;
  let fixture: ComponentFixture<CategoriesLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesLegendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
