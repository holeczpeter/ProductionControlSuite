import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTemporaryPasswordComponent } from './change-temporary-password.component';

describe('ChangeTemporaryPasswordComponent', () => {
  let component: ChangeTemporaryPasswordComponent;
  let fixture: ComponentFixture<ChangeTemporaryPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeTemporaryPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeTemporaryPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
