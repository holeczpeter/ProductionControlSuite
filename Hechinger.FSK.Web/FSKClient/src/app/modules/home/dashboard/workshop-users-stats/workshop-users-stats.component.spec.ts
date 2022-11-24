import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopUsersStatsComponent } from './workshop-users-stats.component';

describe('WorkshopUsersStatsComponent', () => {
  let component: WorkshopUsersStatsComponent;
  let fixture: ComponentFixture<WorkshopUsersStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopUsersStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopUsersStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
