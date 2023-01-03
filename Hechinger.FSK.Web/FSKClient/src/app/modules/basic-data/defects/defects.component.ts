import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, map } from 'rxjs';
import { DefectEditorModel } from '../../../models/dialog-models/defect-editor-model';
import { DefectModel, DeleteDefect } from '../../../models/generated/generated';
import { TableColumnModel } from '../../../models/table-column-model';
import { AccountService } from '../../../services/account.service';
import { DefectDataService } from '../../../services/data/defect-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { CompareService } from '../../../services/sort/sort.service';
import { DefectFilterService } from '../../../services/table/defect-filter.service';
import { PaginationService } from '../../../services/table/pagination.service';
import { SortService } from '../../../services/table/sort.service';
import { TableExportService } from '../../../services/table/table-export.service';
import { TableFilterService } from '../../../services/table/table-filter.service';
import { DefectEditorDialogComponent } from './defect-editor-dialog/defect-editor-dialog.component';

@Component({
  selector: 'app-defects',
  templateUrl: './defects.component.html',
  styleUrls: ['./defects.component.scss']
})
export class DefectsComponent implements OnInit,AfterViewInit  {
  dataSource!: MatTableDataSource<DefectModel>;
  @ViewChild(MatSort) sort!: MatSort;
  columnNames: Array<string> = ['name','translatedName', 'code', 'operationName', 'operationCode','defectCategoryName', 'copy', 'edit', 'delete']
  title = "defects.title";
  filterableColumns: Array<TableColumnModel> = [
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
      name: 'defectCategoryName',
      displayName: 'Hiba kategória',
      exportable: true,
      columnDef: 'defectCategoryNameFilter'
    },
  ];
  filterableColumnNames: Array<string> = ['nameFilter', 'translatedNameFilter', 'codeFilter', 'operationNameFilter', 'operationCodeFilter', 'defectCategoryNameFilter', 'more'];
  filterForm: UntypedFormGroup;
  totalCount!: number;
  constructor(private readonly defectDataService: DefectDataService,
    private readonly accountService: AccountService,
    private readonly dialog: MatDialog,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService,
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
    this.defectDataService.getAll().subscribe(result => {
      this.totalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
      this.dataSource = new MatTableDataSource<DefectModel>(result.body);
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
    this.dataSource = new MatTableDataSource<DefectModel>(elements.body);
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
    this.defectDataService.getAll().subscribe((result: any) => {
        this.refreshDataSource(result);
      });
  }
  onExport() {
    this.translate.get(this.title).subscribe(title => {
      this.exportService.exportFromDataSource(this.dataSource, this.filterableColumns, title);
    });
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
      this.dataSource.sort = this.sort;
    }
  }
}
