import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyQuantityTableComponent } from './daily-quantity-table.component';

describe('DailyQuantityTableComponent', () => {
  let component: DailyQuantityTableComponent;
  let fixture: ComponentFixture<DailyQuantityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyQuantityTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyQuantityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
