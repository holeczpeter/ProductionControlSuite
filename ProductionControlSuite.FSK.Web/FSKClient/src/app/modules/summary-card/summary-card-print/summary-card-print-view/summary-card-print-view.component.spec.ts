import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCardPrintViewComponent } from './summary-card-print-view.component';

describe('SummaryCardPrintViewComponent', () => {
  let component: SummaryCardPrintViewComponent;
  let fixture: ComponentFixture<SummaryCardPrintViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryCardPrintViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryCardPrintViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
