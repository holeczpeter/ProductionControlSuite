import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectGroupWizardComponent } from './defect-group-wizard.component';

describe('DefectGroupWizardComponent', () => {
  let component: DefectGroupWizardComponent;
  let fixture: ComponentFixture<DefectGroupWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefectGroupWizardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefectGroupWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
