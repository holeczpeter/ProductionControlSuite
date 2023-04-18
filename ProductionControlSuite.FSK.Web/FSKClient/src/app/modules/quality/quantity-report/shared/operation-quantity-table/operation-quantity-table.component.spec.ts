import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationQuantityTableComponent } from './operation-quantity-table.component';

describe('OperationQuantityTableComponent', () => {
  let component: OperationQuantityTableComponent;
  let fixture: ComponentFixture<OperationQuantityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationQuantityTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationQuantityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
