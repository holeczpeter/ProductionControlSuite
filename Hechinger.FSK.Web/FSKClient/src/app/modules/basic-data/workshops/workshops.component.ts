import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteWorkshop, WorkshopModel } from '../../../models/generated/generated';
import { WorkshopDataService } from '../../../services/data/workshop-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { TranslateService } from '@ngx-translate/core';
import { WorkshopEditorDialogComponent } from './workshop-editor-dialog/workshop-editor-dialog.component';
import { AccountService } from '../../../services/account.service';
import { TableColumn } from '../../../models/table-column';
import { UntypedFormGroup } from '@angular/forms';
import { CompareService } from '../../../services/sort/sort.service';
import { TableFilterService } from '../../../services/table/table-filter.service';
import { TableExportService } from '../../../services/table/table-export.service';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss']
})
export class WorkshopsComponent implements OnInit, AfterViewInit {
  dataSource!: MatTableDataSource<WorkshopModel>;
  pageSize = this.accountService.getPageSize();
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnNames: Array<string> = ['name','translatedName', 'edit', 'delete']
  title = "workshops.title";
  filterableColumns: Array<TableColumn> = [
    {
      name: 'name',
      displayName: 'Megnevezés',
      exportable: true,
      columnDef: 'nameFilter'
    },
    {
      name: 'translatedName',
      displayName: 'Német megnevezés',
      exportable: true,
      columnDef: 'translatedNameFilter'
    },
   
  ];
  filterableColumnNames: Array<string> = ['nameFilter', 'translatedNameFilter', 'more'];
  filterForm: UntypedFormGroup;
  constructor(private readonly workshopdataService: WorkshopDataService,
    private readonly accountService: AccountService,
    private readonly dialog: MatDialog,
    private readonly workshopDataService: WorkshopDataService,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService,
    public sortService: CompareService,
    public tableFilterService: TableFilterService,
    private readonly exportService: TableExportService) { }

  ngOnInit(): void {
    this.initalize();
  }

  initalize() {
    this.workshopdataService.getAll().subscribe(workshops => {
      this.dataSource = new MatTableDataSource<WorkshopModel>(workshops);
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
  refreshDataSource(elements: Array<WorkshopModel>): void {
    this.dataSource = new MatTableDataSource<WorkshopModel>(elements);
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
        case 'translatedName': return this.sortService.compareString(a.translatedName, b.translatedName, isAsc);
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
    let dialogRef = this.dialog.open(WorkshopEditorDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: null,
      minWidth: '600px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  onEdit(data: WorkshopModel) {
    let dialogRef = this.dialog.open(WorkshopEditorDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: data,
      minWidth: '600px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  onDelete(id: number) {
    let model: DeleteWorkshop = { id: id };
    this.workshopDataService.delete(model).subscribe(result => {
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

