import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopCrapCostComponent } from './workshop-crap-cost.component';

describe('WorkshopCrapCostComponent', () => {
  let component: WorkshopCrapCostComponent;
  let fixture: ComponentFixture<WorkshopCrapCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopCrapCostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopCrapCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
