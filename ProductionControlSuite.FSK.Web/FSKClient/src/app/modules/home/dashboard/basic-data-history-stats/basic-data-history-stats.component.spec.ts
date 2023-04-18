import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDataHistoryStatsComponent } from './basic-data-history-stats.component';

describe('BasicDataHistoryStatsComponent', () => {
  let component: BasicDataHistoryStatsComponent;
  let fixture: ComponentFixture<BasicDataHistoryStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicDataHistoryStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicDataHistoryStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
