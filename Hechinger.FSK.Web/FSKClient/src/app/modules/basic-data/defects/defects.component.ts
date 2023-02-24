import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs';
import { DefectEditorModel } from '../../../models/dialog-models/defect-editor-model';
import { DefectModel, DeleteDefect } from '../../../models/generated/generated';
import { ColumnTypes, TableColumnModel } from '../../../models/table-column-model';
import { ConfirmDialogService } from '../../../services/confirm-dialog/confirm-dialog-service';
import { DefectDataService } from '../../../services/data/defect-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { CompareService } from '../../../services/sort/sort.service';
import { DefectFilterService } from '../../../services/table/defect-filter.service';
import { PaginationService } from '../../../services/table/pagination.service';
import { SortService } from '../../../services/table/sort.service';
import { TableExportService } from '../../../services/table/table-export.service';
import { DefectEditorDialogComponent } from './defect-editor-dialog/defect-editor-dialog.component';

@Component({
  selector: 'app-defects',
  templateUrl: './defects.component.html',
  styleUrls: ['./defects.component.scss']
})
export class DefectsComponent implements OnInit,AfterViewInit  {
  dataSource!: MatTableDataSource<DefectModel>;
  @ViewChild(MatSort) sort!: MatSort;
  columnNames: Array<string> = ['name','translatedName', 'code', 'operationName', 'operationCode','statusName','defectCategoryName', 'copy', 'edit', 'delete']
  title = "defects.title";
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
      type: ColumnTypes.Text,
      width: '100px',
    },
    {
      name: 'operationName',
      displayName: 'Termék',
      exportable: true,
      columnDef: 'operationNameFilter',
      type: ColumnTypes.Text
    },
    {
      name: 'operationCode',
      displayName: 'Termék kód',
      exportable: true,
      columnDef: 'operationCodeFilter',
      type: ColumnTypes.Text,
      width: '100px',
    },
    {
      name: 'defectCategoryName',
      displayName: 'Hiba kategória',
      exportable: true,
      columnDef: 'defectCategoryNameFilter',
      type: ColumnTypes.Text,
      width: '100px',
    },
    {
      name: 'statusName',
      displayName: 'Státusz',
      exportable: true,
      columnDef: 'statusNameFilter',
      type: ColumnTypes.Text,
      width: '100px',
    },
  ];
  filterableColumnNames: Array<string> = ['nameFilter', 'translatedNameFilter', 'codeFilter', 'operationNameFilter', 'operationCodeFilter','statusNameFilter', 'defectCategoryNameFilter', 'more'];
  filterForm: UntypedFormGroup;
  totalCount!: number;
  constructor(private readonly defectDataService: DefectDataService,
    private readonly dialog: MatDialog,
    private readonly confirmDialogService: ConfirmDialogService,
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
    this.defectDataService.getAllDefectByParameters(null).subscribe(result => {
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
    this.defectDataService.getAllDefectByParameters(null).subscribe((result: any) => {
        this.refreshDataSource(result);
      });
  }
  onExport() {
    this.defectDataService.getAllDefectByParameters(this.totalCount).subscribe((result: any) => {
      this.translate.get(this.title).subscribe(title => {
        this.totalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
        let dataSource = new MatTableDataSource<DefectModel>(result.body);
        dataSource.sort = this.sort;
        this.exportService.exportFromDataSource(dataSource, this.filterableColumns, title);
      });
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
    
    this.confirmDialogService.openDeleteConfirm('fehler.confirmDelete').subscribe(result => {
      if (result) {
        let model: DeleteDefect = { id: id };
        this.defectDataService.delete(model).subscribe(result => {
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
