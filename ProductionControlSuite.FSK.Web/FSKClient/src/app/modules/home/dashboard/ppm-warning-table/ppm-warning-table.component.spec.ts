import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpmWarningTableComponent } from './ppm-warning-table.component';

describe('PpmWarningTableComponent', () => {
  let component: PpmWarningTableComponent;
  let fixture: ComponentFixture<PpmWarningTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpmWarningTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpmWarningTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
