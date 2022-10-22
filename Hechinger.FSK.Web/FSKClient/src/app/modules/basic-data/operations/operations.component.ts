import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { OperationEditorModel } from '../../../models/dialog-models/operation-editor-model';
import { DeleteOperation, DeleteProduct, OperationModel } from '../../../models/generated';
import { TableColumn } from '../../../models/table-column';
import { AccountService } from '../../../services/account.service';
import { OperationDataService } from '../../../services/data/operation-data.service';
import { ProductDataService } from '../../../services/data/product-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { SortService } from '../../../services/sort/sort.service';
import { TableExportService } from '../../../services/table/table-export.service';
import { TableFilterService } from '../../../services/table/table-filter.service';
import { OperationEditorDialogComponent } from './operation-editor-dialog/operation-editor-dialog.component';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit, AfterViewInit {
  dataSource!: MatTableDataSource<OperationModel>;
  pageSize = this.accountService.getPageSize();
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnNames: Array<string> = ['name', 'translatedName', 'code', 'productName', 'productCode', 'norma', 'operationTime', 'copy', 'edit', 'delete']
  title = "operations.title";
  filterableColumns: Array<TableColumn> = [
    {
      name: 'name',
      displayName: 'Név',
      exportable: true,
      columnDef: 'nameFilter'
    },
    {
      name: 'translatedName',
      displayName: 'Német megnevezés',
      exportable: true,
      columnDef: 'translatedNameFilter'
    },
    {
      name: 'code',
      displayName: 'Kód',
      exportable: true,
      columnDef: 'codeFilter'
    },
    {
      name: 'productName',
      displayName: 'Termék',
      exportable: true,
      columnDef: 'productNameFilter'
    },
    {
      name: 'productCode',
      displayName: 'Termék kód',
      exportable: true,
      columnDef: 'productCodeFilter'
    },
  ];
  filterableColumnNames: Array<string> = ['nameFilter', 'codeFilter', 'translatedNameFilter', 'productNameFilter', 'productCodeFilter', 'more',];
  filterForm: UntypedFormGroup;
  constructor(private readonly operationDataService: OperationDataService,
    private readonly productDataService: ProductDataService,
    private readonly accountService: AccountService,
    private readonly dialog: MatDialog,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService,
    public sortService: SortService,
    public tableFilterService: TableFilterService,
    private readonly exportService: TableExportService) { }

  ngOnInit(): void {
    this.initalize();
  }
  initalize() {
    this.operationDataService.getAll().subscribe(operations => {
      this.dataSource = new MatTableDataSource<OperationModel>(operations);
      this.createDinamicallyFormGroup();
      this.filterValueChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  createDinamicallyFormGroup(): void {
    this.filterForm = this.tableFilterService.createFilterFormGroup(this.filterableColumns);
  }

  filterValueChanges(): void {
    this.tableFilterService.getFiltered(this.filterForm, this.dataSource.data).subscribe(filtered => {
      this.refreshDataSource(filtered);
    });
  }
  refreshDataSource(elements: Array<OperationModel>): void {
    this.dataSource = new MatTableDataSource<OperationModel>(elements);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  sortData(sort: Sort) {
    const data = this.dataSource.filteredData;
    if (!sort.active || sort.direction === '') {
      this.refreshDataSource(this.dataSource.filteredData);
      return;
    }
    let sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.sortService.compareString(a.name, b.name, isAsc);
        case 'code': return this.sortService.compareString(a.code, b.code, isAsc);
        case 'translatedName': return this.sortService.compareString(a.translatedName, b.translatedName, isAsc);
        case 'productName': return this.sortService.compareString(a.productName, b.productName, isAsc);
        case 'productCode': return this.sortService.compareString(a.productCode, b.productCode, isAsc);
        case 'norma': return this.sortService.compareString(a.norma, b.norma, isAsc);
        case 'operationTime': return this.sortService.compareString(a.operationTime, b.operationTime, isAsc);
        default: return 0;
      }
    });
    this.refreshDataSource(sortedData);
  }
  onExport() {
    this.translate.get(this.title).subscribe(title => {
      this.exportService.export(this.dataSource, this.filterableColumns, title);
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
  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}
