import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { DeleteWorkshop, ShiftModel, WorkshopModel } from '../../../models/generated';
import { TableColumn } from '../../../models/table-column';
import { AccountService } from '../../../services/account.service';
import { ShiftDataService } from '../../../services/data/shift-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { SortService } from '../../../services/sort/sort.service';
import { TableFilterService } from '../../../services/table/table-filter.service';
import { ShiftEditorDialogComponent } from './shift-editor-dialog/shift-editor-dialog.component';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent implements OnInit, AfterViewInit {
  dataSource!: MatTableDataSource<ShiftModel>;
  pageSize = this.accountService.getPageSize();
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnNames: Array<string> = ['name','translatedName','shortName','start','end', 'edit', 'delete']
  title = "shifts.title";
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
    {
      name: 'shortName',
      displayName: 'Rövid megnevezés',
      exportable: true,
      columnDef: 'shortNameFilter'
    },
  ];
  filterableColumnNames: Array<string> = ['nameFilter', 'translatedNameFilter','shortNameFilter', 'more'];
  filterForm: UntypedFormGroup;
  constructor(private readonly shiftDataService: ShiftDataService,
    private readonly accountService: AccountService,
    private readonly dialog: MatDialog,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService,
    public sortService: SortService,
    public tableFilterService: TableFilterService) { }

  ngOnInit(): void {
    this.initalize();
  }

  initalize() {
    this.shiftDataService.getAll().subscribe(shifts => {
      this.dataSource = new MatTableDataSource<ShiftModel>(shifts);
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
  refreshDataSource(elements: Array<ShiftModel>): void {
    this.dataSource = new MatTableDataSource<ShiftModel>(elements);
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
        case 'shortName': return this.sortService.compareString(a.shortName, b.shortName, isAsc);
        case 'translatedName': return this.sortService.compareString(a.translatedName, b.translatedName, isAsc);
        default: return 0;
      }
    });
    this.refreshDataSource(sortedData);
  }
  onAdd() {
    let dialogRef = this.dialog.open(ShiftEditorDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: null,
      minWidth: '600px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  onEdit(data: WorkshopModel) {
    let dialogRef = this.dialog.open(ShiftEditorDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: data,
      minWidth: '600px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  onDelete(id: number) {
    let model: DeleteWorkshop = { id: id };
    this.shiftDataService.delete(model).subscribe(result => {
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

