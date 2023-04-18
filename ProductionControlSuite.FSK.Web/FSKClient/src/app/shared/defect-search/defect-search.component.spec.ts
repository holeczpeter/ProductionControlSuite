import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectSearchComponent } from './defect-search.component';

describe('DefectSearchComponent', () => {
  let component: DefectSearchComponent;
  let fixture: ComponentFixture<DefectSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
