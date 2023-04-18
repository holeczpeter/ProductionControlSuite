import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OperationItem } from '../../../../../models/generated/generated';
import { LanguageService } from '../../../../../services/language/language.service';

@Component({
  selector: 'app-quality-group-report-chart-dialog',
  templateUrl: './quality-group-report-chart-dialog.component.html',
  styleUrls: ['./quality-group-report-chart-dialog.component.scss']
})
export class QualityGroupReportChartDialogComponent implements OnInit {
  operationItem: OperationItem;
  chartTitle = "asda";
  constructor(private readonly dialogRef: MatDialogRef<QualityGroupReportChartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public languageService: LanguageService) {
    this.operationItem = data.operationItem;
    this.chartTitle = data.chartTitle;
  }

  ngOnInit(): void {
  }
  onCancel() {
    this.dialogRef.close(false);
  }
}
