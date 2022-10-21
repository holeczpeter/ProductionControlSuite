import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { DeleteWorkshop, ShiftModel, WorkshopModel } from '../../../models/generated';
import { AccountService } from '../../../services/account.service';
import { ShiftDataService } from '../../../services/data/shift-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { ShiftEditorDialogComponent } from './shift-editor-dialog/shift-editor-dialog.component';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent implements OnInit {
  dataSource!: MatTableDataSource<ShiftModel>;
  pageSize = this.accountService.getPageSize();
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnNames: Array<string> = ['name','translatedName','shortName','start','end', 'edit', 'delete']
  title = "shifts.title";

  constructor(private readonly shiftDataService: ShiftDataService,
    private readonly accountService: AccountService,
    private readonly dialog: MatDialog,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.initalize();
  }

  initalize() {
    this.shiftDataService.getAll().subscribe(shifts => {
      this.dataSource = new MatTableDataSource<ShiftModel>(shifts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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
}

