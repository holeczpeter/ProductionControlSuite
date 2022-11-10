import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCardHeaderComponent } from './summary-card-header.component';

describe('SummaryCardHeaderComponent', () => {
  let component: SummaryCardHeaderComponent;
  let fixture: ComponentFixture<SummaryCardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryCardHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
