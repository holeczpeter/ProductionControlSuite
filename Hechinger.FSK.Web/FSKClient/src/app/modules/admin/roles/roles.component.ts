import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { DeleteRole, RoleModel, SetDefaultRole, UserModel } from '../../../models/generated';
import { AccountService } from '../../../services/account.service';
import { RoleDataService } from '../../../services/data/role-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { RoleEditorDialogComponent } from './role-editor-dialog/role-editor-dialog.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  dataSource!: MatTableDataSource<RoleModel>;
  pageSize = this.accountService.getPageSize();
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnNames: Array<string> = ['name','translatedName', 'code', 'isDefault', 'edit','delete']
  title = "roles.title";

  constructor(private readonly roleDataService: RoleDataService,
    private readonly accountService: AccountService,
    private readonly dialog: MatDialog,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.initalize();
  }

  initalize() {
    this.roleDataService.getAll().subscribe(roles => {
      this.dataSource = new MatTableDataSource<RoleModel>(roles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onAdd() {
    let dialogRef = this.dialog.open(RoleEditorDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: null,
      minWidth: '800px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  onEdit(data: UserModel) {

    let dialogRef = this.dialog.open(RoleEditorDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: data,
      minWidth: '800px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }

  onDelete(id: number) {
    let model: DeleteRole = { id: id };
    this.roleDataService.delete(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.initalize()

    });
  }
  onChange(event: MatCheckboxChange, role: RoleModel): void {
    if (event.checked) {
      let previousDefault = this.dataSource.data.find(x => x.isDefault && x.id != role.id);
      if (previousDefault) previousDefault.isDefault = false;
      let request: SetDefaultRole = { id: role.id }
      this.roleDataService.setDefault(request).subscribe(result => {
        this.snackBar.open(result);
      });
    }
  }
}
