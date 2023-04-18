import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectGroupsComponent } from './defect-groups.component';

describe('DefectGroupsComponent', () => {
  let component: DefectGroupsComponent;
  let fixture: ComponentFixture<DefectGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefectGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
