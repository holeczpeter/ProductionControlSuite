import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCardEditorDialogComponent } from './summary-card-editor-dialog.component';

describe('SummaryCardEditorDialogComponent', () => {
  let component: SummaryCardEditorDialogComponent;
  let fixture: ComponentFixture<SummaryCardEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryCardEditorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryCardEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
