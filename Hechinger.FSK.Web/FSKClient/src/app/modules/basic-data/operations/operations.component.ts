import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { OperationEditorModel } from '../../../models/dialog-models/operation-editor-model';
import { DeleteOperation, DeleteProduct, OperationModel } from '../../../models/generated';
import { AccountService } from '../../../services/account.service';
import { OperationDataService } from '../../../services/data/operation-data.service';
import { ProductDataService } from '../../../services/data/product-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { OperationEditorDialogComponent } from './operation-editor-dialog/operation-editor-dialog.component';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {
  dataSource!: MatTableDataSource<OperationModel>;
  pageSize = this.accountService.getPageSize();
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnNames: Array<string> = ['name', 'code', 'norma', 'operationTime', 'productName', 'productCode', 'copy', 'edit', 'delete']
  title = "operations.title";

  constructor(private readonly operationDataService: OperationDataService,
    private readonly productDataService: ProductDataService,
    private readonly accountService: AccountService,
    private readonly dialog: MatDialog,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.initalize();
  }

  initalize() {
    this.operationDataService.getAll().subscribe(operations => {
      this.dataSource = new MatTableDataSource<OperationModel>(operations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onAdd() {
    let dialogRef = this.dialog.open(OperationEditorDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: null,
      minWidth: '600px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  onEdit(data: OperationModel) {
    let operationModel: OperationEditorModel = {
      operationModel: data,
      isCopy: false
    }
    let dialogRef = this.dialog.open(OperationEditorDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: operationModel,
      minWidth: '600px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  onCopy(data: OperationModel) {
    let operationModel: OperationEditorModel = {
      operationModel: data,
      isCopy: true
    }
    let dialogRef = this.dialog.open(OperationEditorDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: operationModel,
      minWidth: '600px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  onDelete(id: number) {
    let model: DeleteOperation = { id: id };
    this.operationDataService.delete(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.initalize()

    });
  }
}
