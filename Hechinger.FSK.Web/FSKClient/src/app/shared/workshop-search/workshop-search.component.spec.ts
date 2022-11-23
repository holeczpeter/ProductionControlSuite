import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopSearchComponent } from './workshop-search.component';

describe('WorkshopSearchComponent', () => {
  let component: WorkshopSearchComponent;
  let fixture: ComponentFixture<WorkshopSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
