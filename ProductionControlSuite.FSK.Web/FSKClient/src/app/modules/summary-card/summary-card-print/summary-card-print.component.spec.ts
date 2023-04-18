import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCardPrintComponent } from './summary-card-print.component';

describe('SummaryCardPrintComponent', () => {
  let component: SummaryCardPrintComponent;
  let fixture: ComponentFixture<SummaryCardPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryCardPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryCardPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
