import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrapCostsComponent } from './crap-costs.component';

describe('CrapCostsComponent', () => {
  let component: CrapCostsComponent;
  let fixture: ComponentFixture<CrapCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrapCostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrapCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
