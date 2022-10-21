import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteProduct, DeleteWorkshop, ProductModel, WorkshopModel } from '../../../models/generated';
import { WorkshopDataService } from '../../../services/data/workshop-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { ProductEditorDialogComponent } from './product-editor-dialog/product-editor-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { ProductDataService } from '../../../services/data/product-data.service';
import { ProductEditorModel } from '../../../models/dialog-models/product-editor-model';
import { AccountService } from '../../../services/account.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  dataSource!: MatTableDataSource<ProductModel>;
  pageSize = this.accountService.getPageSize();
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnNames: Array<string> = ['name','translatedName','code','workshopName','copy', 'edit', 'delete']
  title = "products.title";

  constructor(private readonly productDataService: ProductDataService,
    private readonly workshopdataService: WorkshopDataService,
    private readonly accountService: AccountService,
    private readonly dialog: MatDialog,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.initalize();
  }

  initalize() {
    this.productDataService.getAll().subscribe(products => {
      this.dataSource = new MatTableDataSource<ProductModel>(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
}
