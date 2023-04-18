import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { ProductEditorModel } from '../../../models/dialog-models/product-editor-model';
import { DeleteProduct, ProductModel } from '../../../models/generated/generated';
import { ColumnTypes, TableColumnModel } from '../../../models/table-column-model';
import { AccountService } from '../../../services/account.service';
import { ConfirmDialogService } from '../../../services/confirm-dialog/confirm-dialog-service';
import { ProductDataService } from '../../../services/data/product-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { CompareService } from '../../../services/sort/sort.service';
import { DefectFilterService } from '../../../services/table/defect-filter.service';
import { PaginationService } from '../../../services/table/pagination.service';
import { SortService } from '../../../services/table/sort.service';
import { TableExportService } from '../../../services/table/table-export.service';
import { TableFilterService } from '../../../services/table/table-filter.service';
import { OperationListComponent } from './operation-list/operation-list.component';
import { ProductEditorDialogComponent } from './product-editor-dialog/product-editor-dialog.component';
import { ProductWizardEditorComponent } from './product-wizard-editor/product-wizard-editor.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource!: MatTableDataSource<ProductModel>;
  @ViewChild(MatSort) sort!: MatSort;
  columnNames: Array<string> = ['name', 'translatedName', 'code', 'workshopName', 'statusName', 'operationsCount','copy', 'edit', 'delete'];
  filterableColumns: Array<TableColumnModel> =[
    {
      name: 'name',
      displayName: 'Név',
      exportable: true,
      columnDef: 'nameFilter',
      type: ColumnTypes.Text
    },
    {
      name: 'code',
      displayName: 'Kód',
      exportable: true,
      columnDef: 'codeFilter',
      type: ColumnTypes.Text,
      width: '150px',
    },
    {
      name: 'translatedName',
      displayName: 'Német megnevezés',
      exportable: true,
      columnDef: 'translatedNameFilter',
      type: ColumnTypes.Text
    },
    {
      name: 'workshopName',
      displayName: 'Műhely',
      exportable: true,
      columnDef: 'workshopNameFilter',
      type: ColumnTypes.Text,
      width: '150px',
    },
    {
      name: 'statusName',
      displayName: 'Státusz',
      exportable: true,
      columnDef: 'statusNameFilter',
      type: ColumnTypes.Text,
      width: '100px',
    },
    {
      name: 'operationsCount',
      displayName: 'Műveletek',
      exportable: true,
      columnDef: 'operationsCountFilter',
      type: ColumnTypes.Text,
      width: '100px',
    },
  ];
  filterableColumnNames: Array<string> = ['nameFilter', 'translatedNameFilter', 'codeFilter', 'workshopNameFilter', 'statusNameFilter',  'operationsCountFilter', 'more'];
  title = "products.title";
  filterForm: UntypedFormGroup;
  totalCount!: number;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly productDataService: ProductDataService,
    private readonly dialog: MatDialog,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService,
    public tableFilterService: TableFilterService,
    public compareService: CompareService,
    public sortService: SortService,
    private readonly confirmDialogService: ConfirmDialogService,
    private readonly exportService: TableExportService,
    public paginationService: PaginationService,
    private readonly filterService: DefectFilterService) {

  }
  

  ngOnInit(): void {
    this.initalize();
  }
 
  initalize() {
    this.productDataService.getProductsByParameters(null).pipe(takeUntil(this.destroy$)).subscribe(result => {
      this.refreshDataSource(result);
      this.createDinamicallyFormGroup();
      this.filterForm.valueChanges.pipe(
        debounceTime(500)).subscribe(x => {
          this.getAll();
        })
    });
  }

  createDinamicallyFormGroup(): void {
    this.filterForm = this.filterService.createFilterFormGroup(this.filterableColumns);
  }
  
  refreshDataSource(elements: any): void {
    this.totalCount = JSON.parse(elements.headers.get('X-Pagination')).totalCount;
    this.dataSource = new MatTableDataSource<ProductModel>(elements.body);
    this.dataSource.sort = this.sort;
  }

  sortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') return;
    const sortProperty = this.columnNames.find(x => x === sort.active);
    if (sortProperty) {
      const isAsc = sort.direction === 'asc';
      this.sortService.sort(sortProperty, isAsc);
      this.getAll();
      this.sortService.sort('id', isAsc);
    }
  }

  switchPage(event: PageEvent): void {
    this.paginationService.change(event);
    this.getAll();
  }
  getAll(): void {
    this.productDataService.getProductsByParameters(null).pipe(takeUntil(this.destroy$)).subscribe((result: any) => {
      this.refreshDataSource(result);
    });
  }
  onExport() {
    this.productDataService.getProductsByParameters(this.totalCount).pipe(takeUntil(this.destroy$)).subscribe((result: any) => {
      this.translate.get(this.title).subscribe(title => {
        this.totalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
        let dataSource = new MatTableDataSource<ProductModel>(result.body);
        dataSource.sort = this.sort;
        this.translate.get(this.title).pipe(takeUntil(this.destroy$)).subscribe(title => {
          this.exportService.exportFromDataSource(dataSource, this.filterableColumns, title);
        });
      });
    });
  }
  onAdd() {
    let dialogRef = this.dialog.open(ProductEditorDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: null,
      minWidth: '750px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  onOpenOperations(data: ProductModel) {
    let dialogRef = this.dialog.open(OperationListComponent, {
      disableClose: true,
      autoFocus: false,
      data: data.id,
      maxWidth: '1200px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  onEdit(data: ProductModel) {
    let productEditorModel: ProductEditorModel = {
      productModel: data,
      isCopy: false
    }
    let dialogRef = this.dialog.open(ProductEditorDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: productEditorModel,
      minWidth: '750px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  onAddContext() {
    let dialogRef = this.dialog.open(ProductWizardEditorComponent, {
      disableClose: true,
      autoFocus: false,
      data: 0,
      minWidth: '750px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  onEditContext(data: ProductModel) {
   
    let dialogRef = this.dialog.open(ProductWizardEditorComponent, {
      disableClose: true,
      autoFocus: false,
      data: data.id,
      minWidth: '750px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  onCopy(data: ProductModel) {
    let productEditorModel: ProductEditorModel = {
      productModel: data,
      isCopy : true
    }
    let dialogRef = this.dialog.open(ProductEditorDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: productEditorModel,
      minWidth: '750px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  onDelete(id: number) {
    this.confirmDialogService.openDeleteConfirm('product.confirmDelete').subscribe(result => {
      if (result) {
        let model: DeleteProduct = { id: id };
        this.productDataService.delete(model).subscribe(result => {
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
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
