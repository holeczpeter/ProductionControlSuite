import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteProduct, DeleteWorkshop, ProductModel, WorkshopModel } from '../../../models/generated/generated';
import { WorkshopDataService } from '../../../services/data/workshop-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { ProductEditorDialogComponent } from './product-editor-dialog/product-editor-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { ProductDataService } from '../../../services/data/product-data.service';
import { ProductEditorModel } from '../../../models/dialog-models/product-editor-model';
import { AccountService } from '../../../services/account.service';
import { TableFilterService } from '../../../services/table/table-filter.service';
import { UntypedFormGroup } from '@angular/forms';
import { TableColumn } from '../../../models/table-column';
import { debounceTime, filter } from 'rxjs';
import { CompareService } from '../../../services/sort/sort.service';
import { TableExportService } from '../../../services/table/table-export.service';
import { SortService } from '../../../services/table/sort.service';
import { PaginationService } from '../../../services/table/pagination.service';
import { DefectFilterService } from '../../../services/table/defect-filter.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit{
  dataSource!: MatTableDataSource<ProductModel>;
  @ViewChild(MatSort) sort!: MatSort;
  columnNames: Array<string> = ['name', 'translatedName', 'code', 'workshopName', 'copy', 'edit', 'delete'];
  filterableColumns: Array<TableColumn> =[
    {
      name: 'name',
      displayName: 'Név',
      exportable: true,
      columnDef: 'nameFilter'
    },
    {
      name: 'code',
      displayName: 'Kód',
      exportable: true,
      columnDef: 'codeFilter'
    },
    {
      name: 'translatedName',
      displayName: 'Német megnevezés',
      exportable: true,
      columnDef: 'translatedNameFilter'
    },
    {
      name: 'workshopName',
      displayName: 'Műhely',
      exportable: true,
      columnDef: 'workshopNameFilter'
    },
  ];
  filterableColumnNames: Array<string> = ['nameFilter', 'translatedNameFilter', 'codeFilter', 'workshopNameFilter','more'];
  title = "products.title";
  filterForm: UntypedFormGroup;
  totalCount!: number;
  constructor(private readonly productDataService: ProductDataService,
    private readonly accountService: AccountService,
    private readonly dialog: MatDialog,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService,
    public tableFilterService: TableFilterService,
    public compareService: CompareService,
    public sortService: SortService,
    private readonly exportService: TableExportService,
    public paginationService: PaginationService,
    private readonly filterService: DefectFilterService) {

  }
  

  ngOnInit(): void {
    this.initalize();
  }
 
  initalize() {
    this.productDataService.getAll().subscribe(result => {
      this.totalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
      this.dataSource = new MatTableDataSource<ProductModel>(result.body);
      this.createDinamicallyFormGroup();
      this.filterForm.valueChanges.pipe(
        debounceTime(500)).subscribe(x => {
          this.getAll();
        })
      this.dataSource.sort = this.sort;
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
    }
  }

  switchPage(event: PageEvent): void {
    this.paginationService.change(event);
    this.getAll();
  }
  getAll(): void {
    this.productDataService.getAll().subscribe((result: any) => {
      this.refreshDataSource(result);
    });
  }
  onExport() {
    this.translate.get(this.title).subscribe(title => {
      this.exportService.export(this.dataSource, this.filterableColumns, title);
    });
    
  }
  onAdd() {
    let dialogRef = this.dialog.open(ProductEditorDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: null,
      minWidth: '600px'
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
      minWidth: '600px'
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
      minWidth: '600px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  onDelete(id: number) {
    let model: DeleteProduct = { id: id };
    this.productDataService.delete(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.initalize()

    });
  }
  
  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }
}
