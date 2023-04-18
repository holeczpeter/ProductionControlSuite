import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialAvatarComponent } from './initial-avatar.component';

describe('InitialAvatarComponent', () => {
  let component: InitialAvatarComponent;
  let fixture: ComponentFixture<InitialAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitialAvatarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
