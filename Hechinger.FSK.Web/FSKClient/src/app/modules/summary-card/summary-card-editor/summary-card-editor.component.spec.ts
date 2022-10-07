import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCardEditorComponent } from './summary-card-editor.component';

describe('SummaryCardEditorComponent', () => {
  let component: SummaryCardEditorComponent;
  let fixture: ComponentFixture<SummaryCardEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryCardEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryCardEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
