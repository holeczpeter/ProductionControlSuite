import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs';
import { OperationEditorModel } from '../../../models/dialog-models/operation-editor-model';
import { DeleteOperation, DeleteProduct, OperationModel } from '../../../models/generated/generated';
import { ColumnTypes, TableColumnModel } from '../../../models/table-column-model';
import { AccountService } from '../../../services/account.service';
import { ConfirmDialogService } from '../../../services/confirm-dialog/confirm-dialog-service';
import { OperationDataService } from '../../../services/data/operation-data.service';
import { ProductDataService } from '../../../services/data/product-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { CompareService } from '../../../services/sort/sort.service';
import { DefectFilterService } from '../../../services/table/defect-filter.service';
import { PaginationService } from '../../../services/table/pagination.service';
import { SortService } from '../../../services/table/sort.service';
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
  columnNames: Array<string> = ['name', 'translatedName', 'code', 'productName', 'productCode', 'norma', 'operationTime', 'ppmGoal', 'statusName', 'defectsCount','copy', 'edit', 'delete']
  title = "operations.title";
  filterableColumns: Array<TableColumnModel> = [
    {
      name: 'name',
      displayName: 'Név',
      exportable: true,
      columnDef: 'nameFilter',
      type: ColumnTypes.Text
    },
    {
      name: 'translatedName',
      displayName: 'Német megnevezés',
      exportable: true,
      columnDef: 'translatedNameFilter',
      type: ColumnTypes.Text
    },
    {
      name: 'code',
      displayName: 'Kód',
      exportable: true,
      columnDef: 'codeFilter',
      type: ColumnTypes.Text
    },
    {
      name: 'productCode',
      displayName: 'Termék kód',
      exportable: true,
      columnDef: 'productCodeFilter',
      type: ColumnTypes.Text
    },
    {
      name: 'productName',
      displayName: 'Termék',
      exportable: true,
      columnDef: 'productNameFilter',
      type: ColumnTypes.Text
    },
    {
      name: 'norma',
      displayName: 'Norma',
      exportable: true,
      columnDef: 'normaFilter',
      type: ColumnTypes.Text
    },
    {
      name: 'ppmGoal',
      displayName: 'PPM cél',
      exportable: true,
      columnDef: 'ppmGoalFilter',
      type: ColumnTypes.Text
    },
    {
      name: 'operationTime',
      displayName: 'Műveleti idő',
      exportable: true,
      columnDef: 'operationTimeFilter',
      type: ColumnTypes.Text
    },
    
    {
      name: 'statusName',
      displayName: 'Státusz',
      exportable: true,
      columnDef: 'statusNameFilter',
      type: ColumnTypes.Text
    },
    {
      name: 'defectsCount',
      displayName: 'Hibák száma',
      exportable: true,
      columnDef: 'defectsCountFilter',
      type: ColumnTypes.Text
    },
  ];
  filterableColumnNames: Array<string> = ['nameFilter', 'translatedNameFilter', 'codeFilter', 'productNameFilter', 'productCodeFilter', 'normaFilter', 'operationTimeFilter', 'ppmGoalFilter', 'statusNameFilter','defectsCountFilter',  'more',];
  filterForm: UntypedFormGroup;
  totalCount!: number;
  constructor(private readonly operationDataService: OperationDataService,
    private readonly productDataService: ProductDataService,
    private readonly confirmDialogService: ConfirmDialogService,
    private readonly accountService: AccountService,
    private readonly dialog: MatDialog,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService,
    public tableFilterService: TableFilterService,
    public compareService: CompareService,
    public sortService: SortService,
    private readonly exportService: TableExportService,
    public paginationService: PaginationService,
    private readonly filterService: DefectFilterService  ) { }

  ngOnInit(): void {
    this.initalize();
  }
  initalize() {
    this.operationDataService.getAllOperationByParameters(null).subscribe(result => {
      this.totalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
      this.dataSource = new MatTableDataSource<OperationModel>(result.body);
      this.createDinamicallyFormGroup();
      this.filterForm.valueChanges.pipe(
        debounceTime(500)).subscribe(x => {
          this.getByParameters();
        })
      this.dataSource.sort = this.sort;
    });
    
  }

  createDinamicallyFormGroup(): void {
    this.filterForm = this.filterService.createFilterFormGroup(this.filterableColumns);
  }

  refreshDataSource(elements: any): void {
    this.totalCount = JSON.parse(elements.headers.get('X-Pagination')).totalCount;
    this.dataSource = new MatTableDataSource<OperationModel>(elements.body);
    this.dataSource.sort = this.sort;
  }

  sortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') return;
    const sortProperty = this.columnNames.find(x => x === sort.active);
    if (sortProperty) {
      const isAsc = sort.direction === 'asc';
      this.sortService.sort(sortProperty, isAsc);
      this.getByParameters();
    }
  }

  switchPage(event: PageEvent): void {
    this.paginationService.change(event);
    this.getByParameters();
  }
  getByParameters(): void {
    this.operationDataService.getAllOperationByParameters(null).subscribe((result: any) => {
      this.refreshDataSource(result);
    });
  }
  onExport() {
    this.operationDataService.getAllOperationByParameters(this.totalCount).subscribe((result: any) => {
      this.translate.get(this.title).subscribe(title => {
        this.totalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
        let dataSource = new MatTableDataSource<OperationModel>(result.body);
        dataSource.sort = this.sort;
        this.translate.get(this.title).subscribe(title => {
          this.exportService.exportFromDataSource(dataSource, this.filterableColumns, title);
        });
      });
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
    this.confirmDialogService.openDeleteConfirm('operation.confirmDelete').subscribe(result => {
      if (result) {
        let model: DeleteOperation = { id: id };
        this.operationDataService.delete(model).subscribe(result => {
          this.snackBar.open(result);
          if (result.isSuccess) this.initalize()

        });
      }
    });
  }
  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }
}
