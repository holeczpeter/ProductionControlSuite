import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrapCostTableComponent } from './crap-cost-table.component';

describe('CrapCostTableComponent', () => {
  let component: CrapCostTableComponent;
  let fixture: ComponentFixture<CrapCostTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrapCostTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrapCostTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
