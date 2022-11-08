import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyOperationQuantityComponent } from './daily-operation-quantity.component';

describe('DailyOperationQuantityComponent', () => {
  let component: DailyOperationQuantityComponent;
  let fixture: ComponentFixture<DailyOperationQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyOperationQuantityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyOperationQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
