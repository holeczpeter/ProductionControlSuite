import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationCrapCostComponent } from './operation-crap-cost.component';

describe('OperationCrapCostComponent', () => {
  let component: OperationCrapCostComponent;
  let fixture: ComponentFixture<OperationCrapCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationCrapCostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationCrapCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
