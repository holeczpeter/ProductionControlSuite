import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityMenuComponent } from './quality-menu.component';

describe('QualityMenuComponent', () => {
  let component: QualityMenuComponent;
  let fixture: ComponentFixture<QualityMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualityMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
