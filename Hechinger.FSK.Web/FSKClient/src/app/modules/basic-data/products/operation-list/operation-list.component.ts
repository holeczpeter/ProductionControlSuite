import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { GetOperationsByProduct, OperationModel } from '../../../../models/generated/generated';
import { AccountService } from '../../../../services/account.service';
import { OperationDataService } from '../../../../services/data/operation-data.service';
import { CompareService } from '../../../../services/sort/sort.service';
import { PaginationService } from '../../../../services/table/pagination.service';
import { SortService } from '../../../../services/table/sort.service';
import { TableFilterService } from '../../../../services/table/table-filter.service';

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.scss']
})
export class OperationListComponent implements OnInit {
  dataSource!: MatTableDataSource<OperationModel>;
  pageSize = this.accountService.getPageSize();
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnNames: Array<string> = ['name', 'translatedName', 'code', 'productName', 'productCode', 'norma', 'operationTime', 'ppmGoal', 'statusName']
  title = "operations.title";
  constructor(private readonly dialogRef: MatDialogRef<OperationListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private readonly operationDataService: OperationDataService,
    private readonly accountService: AccountService,
    public translate: TranslateService,
    public tableFilterService: TableFilterService,
    public compareService: CompareService,
    public sortService: SortService,
    public paginationService: PaginationService) { }

  ngOnInit(): void {
    let request: GetOperationsByProduct = { productId: this.data };
    this.operationDataService.getByProduct(request).subscribe(result => {
      this.dataSource = new MatTableDataSource<OperationModel>(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  onCancel() {
    this.dialogRef.close(false);
  }
}
