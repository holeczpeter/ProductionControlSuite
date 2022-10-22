import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteProduct, DeleteWorkshop, ProductModel, WorkshopModel } from '../../../models/generated';
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
import { filter } from 'rxjs';
import { SortService } from '../../../services/sort/sort.service';
import { TableExportService } from '../../../services/table/table-export.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit{
  dataSource!: MatTableDataSource<ProductModel>;
  pageSize = this.accountService.getPageSize();
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
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
  constructor(private readonly productDataService: ProductDataService,
    private readonly accountService: AccountService,
    private readonly dialog: MatDialog,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService,
    public sortService: SortService,
    public tableFilterService: TableFilterService,
    private readonly exportService: TableExportService) {

  }
  

  ngOnInit(): void {
    this.initalize();
  }
 
  initalize() {
    this.productDataService.getAll().subscribe(products => {
      this.dataSource = new MatTableDataSource<ProductModel>(products);
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
  refreshDataSource(elements: Array<ProductModel>): void {
    this.dataSource = new MatTableDataSource<ProductModel>(elements);
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
        case 'workshopName': return this.sortService.compareString(a.workshopName, b.workshopName, isAsc);
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
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}
