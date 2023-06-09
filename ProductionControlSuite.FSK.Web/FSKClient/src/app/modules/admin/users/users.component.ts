import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { DeleteUser, UserModel } from '../../../models/generated/generated';
import { ColumnTypes, TableColumnModel } from '../../../models/table-column-model';
import { AccountService } from '../../../services/account.service';
import { ConfirmDialogService } from '../../../services/confirm-dialog/confirm-dialog-service';
import { UserDataService } from '../../../services/data/user-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { CompareService } from '../../../services/sort/sort.service';
import { TableFilterService } from '../../../services/table/table-filter.service';
import { ChangePasswordEditorDialogComponent } from './change-password-editor-dialog/change-password-editor-dialog.component';
import { UserEditorDialogComponent } from './user-editor-dialog/user-editor-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersComponent implements OnInit, OnDestroy {

  dataSource!: MatTableDataSource<UserModel>;
  pageSize = this.accountService.getPageSize();
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnNames: Array<string> = ['fullName', 'code', 'roleName', 'languageName', 'statusName', 'workshops', 'password', 'edit', 'delete']
  rowsText: Array<string> = ['fullName', 'code', 'roleName', 'languageName', 'statusName', 'workshops', 'password', 'edit', 'delete']
  expandedElement: UserModel | null;
  title = "users.title";
  filterableColumns: Array<TableColumnModel> = [
    {
      name: 'fullName',
      displayName: 'Név',
      exportable: true,
      columnDef: 'fullNameFilter',
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
      name: 'roleName',
      displayName: 'Szerepkör',
      exportable: true,
      columnDef: 'roleNameFilter',
      type: ColumnTypes.Text
    },
    {
      name: 'languageName',
      displayName: 'Nyelv',
      exportable: true,
      columnDef: 'languageNameFilter',
      type: ColumnTypes.Text
    },
    {
      name: 'statusName',
      displayName: 'Státusz',
      exportable: true,
      columnDef: 'statusNameFilter',
      type: ColumnTypes.Text
    },
  ];
  filterableColumnNames: Array<string> = ['fullNameFilter', 'codeFilter', 'roleNameFilter', 'languageNameFilter', 'statusNameFilter', 'more'];
  filterForm: UntypedFormGroup;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly userDataService: UserDataService,
    private readonly accountService: AccountService,
    private readonly dialog: MatDialog,
    private readonly confirmDialogService: ConfirmDialogService,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService,
    public sortService: CompareService,
    public tableFilterService: TableFilterService) { }
   

  ngOnInit(): void {
    this.initalize();
  }

  initalize() {
    this.userDataService.getAll().pipe(takeUntil(this.destroy$)).subscribe(users => {
      this.dataSource = new MatTableDataSource<UserModel>(users);
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
  refreshDataSource(elements: Array<UserModel>): void {
    this.dataSource = new MatTableDataSource<UserModel>(elements);
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
        case 'fullName': return this.sortService.compareString(a.fullName, b.fullName, isAsc);
        case 'code': return this.sortService.compareString(a.code, b.code, isAsc);
        case 'roleName': return this.sortService.compareString(a.roleName, b.roleName, isAsc);
        case 'languageName': return this.sortService.compareString(a.languageName, b.languageName, isAsc);
        case 'statusName': return this.sortService.compareString(a.statusName, b.statusName, isAsc);
      
        default: return 0;
      }
    });
    this.refreshDataSource(sortedData);
  }
  onAdd() {
    let dialogRef = this.dialog.open(UserEditorDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: null,
      minWidth: '600px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  onChangePassword(data: UserModel) {

    let dialogRef = this.dialog.open(ChangePasswordEditorDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: data,
      minWidth: '600px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }

  onEdit(data: UserModel) {
  
    let dialogRef = this.dialog.open(UserEditorDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: data,
      minWidth: '600px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  
  onDelete(id: number) {
    this.confirmDialogService.openDeleteConfirm('user.confirmDelete').subscribe(result => {
      if (result) {
        let model: DeleteUser = { id: id };
        this.userDataService.delete(model).subscribe(result => {
          this.snackBar.open(result);
          if (result.isSuccess) this.initalize()

        });
      }
    });
   
  }
  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
