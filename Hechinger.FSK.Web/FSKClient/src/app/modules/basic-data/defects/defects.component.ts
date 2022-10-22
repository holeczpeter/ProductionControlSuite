import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { DefectEditorModel } from '../../../models/dialog-models/defect-editor-model';
import { DefectModel, DeleteDefect } from '../../../models/generated';
import { TableColumn } from '../../../models/table-column';
import { AccountService } from '../../../services/account.service';
import { DefectDataService } from '../../../services/data/defect-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { SortService } from '../../../services/sort/sort.service';
import { TableFilterService } from '../../../services/table/table-filter.service';
import { DefectEditorDialogComponent } from './defect-editor-dialog/defect-editor-dialog.component';




@Component({
  selector: 'app-defects',
  templateUrl: './defects.component.html',
  styleUrls: ['./defects.component.scss']
})
export class DefectsComponent implements OnInit,AfterViewInit  {
  dataSource!: MatTableDataSource<DefectModel>;
  pageSize = this.accountService.getPageSize();
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnNames: Array<string> = ['name','translatedName', 'code', 'operationName', 'operationCode','defectCategory', 'copy', 'edit', 'delete']
  title = "defects.title";
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
      name: 'operationName',
      displayName: 'Termék',
      exportable: true,
      columnDef: 'operationNameFilter'
    },
    {
      name: 'operationCode',
      displayName: 'Termék kód',
      exportable: true,
      columnDef: 'operationCodeFilter'
    },
    {
      name: 'defectCategory',
      displayName: 'Termék kód',
      exportable: true,
      columnDef: 'defectCategoryFilter'
    },
  ];
  filterableColumnNames: Array<string> = ['nameFilter', 'translatedNameFilter', 'codeFilter', 'operationNameFilter', 'operationCodeFilter', 'defectCategoryFilter', 'more'];
  filterForm: UntypedFormGroup;
  constructor(private readonly defectDataService: DefectDataService,
    private readonly accountService: AccountService,
    private readonly dialog: MatDialog,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService,
    public sortService: SortService,
    public tableFilterService: TableFilterService ) { }

  ngOnInit(): void {
    this.initalize();
  }

  initalize() {
    this.defectDataService.getAll().subscribe(products => {
      this.dataSource = new MatTableDataSource<DefectModel>(products);
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
  refreshDataSource(elements: Array<DefectModel>): void {
    this.dataSource = new MatTableDataSource<DefectModel>(elements);
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
        case 'operationName': return this.sortService.compareString(a.operationName, b.operationName, isAsc);
        case 'operationCode': return this.sortService.compareString(a.operationCode, b.operationCode, isAsc);
        case 'defectCategory': return this.sortService.compareNumber(a.defectCategory, b.defectCategory, isAsc);
       
        default: return 0;
      }
    });
    this.refreshDataSource(sortedData);
  }
  onAdd() {
    let dialogRef = this.dialog.open(DefectEditorDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: null,
      minWidth: '600px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  onEdit(data: DefectModel) {
    let defectEditorModel: DefectEditorModel = {
      defectModel: data,
      isCopy: false
    }
    let dialogRef = this.dialog.open(DefectEditorDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: defectEditorModel,
      minWidth: '600px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  onCopy(data: DefectModel) {
    let defectEditorModel: DefectEditorModel = {
      defectModel: data,
      isCopy: true
    }
    let dialogRef = this.dialog.open(DefectEditorDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: defectEditorModel,
      minWidth: '600px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  onDelete(id: number) {
    let model: DeleteDefect = { id: id };
    this.defectDataService.delete(model).subscribe(result => {
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
