import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { DefectModel, GetDefectsByOperation } from '../../../../models/generated/generated';
import { AccountService } from '../../../../services/account.service';
import { DefectDataService } from '../../../../services/data/defect-data.service';

@Component({
  selector: 'app-defect-list',
  templateUrl: './defect-list.component.html',
  styleUrls: ['./defect-list.component.scss']
})
export class DefectListComponent implements OnInit {
  dataSource!: MatTableDataSource<DefectModel>;
  pageSize = this.accountService.getPageSize();
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnNames: Array<string> = ['name', 'translatedName', 'code', 'operationName', 'operationCode', 'statusName', 'defectCategoryName']
  title = "defects.title";
  constructor(private readonly dialogRef: MatDialogRef<DefectListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private readonly accountService: AccountService,
    private readonly defectDataService: DefectDataService,
    private readonly dialog: MatDialog,
    public translate: TranslateService) { }

  ngOnInit(): void {
    let request: GetDefectsByOperation = { operationId: this.data };
    this.defectDataService.getByOperation(request).subscribe(result => {
      this.dataSource = new MatTableDataSource<DefectModel>(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  onCancel() {
    this.dialogRef.close(false);
  }

}
