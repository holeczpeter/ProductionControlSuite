import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-summary-card-editor-dialog',
  templateUrl: './summary-card-editor-dialog.component.html',
  styleUrls: ['./summary-card-editor-dialog.component.scss']
})
export class SummaryCardEditorDialogComponent implements OnInit {
  title!: string;

  constructor(private readonly dialogRef: MatDialogRef<SummaryCardEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) {
    this.title = "summarycard.edit";
  }

  ngOnInit(): void {
  }
 
  onSave() {

  }
  onCancel() {
    this.dialogRef.close(false);
  }
}
