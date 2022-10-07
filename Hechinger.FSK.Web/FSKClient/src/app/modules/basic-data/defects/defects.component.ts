import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { DefectEditorModel } from '../../../models/dialog-models/defect-editor-model';
import { DefectModel, DeleteDefect } from '../../../models/generated';
import { DefectDataService } from '../../../services/data/defect-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { DefectEditorDialogComponent } from './defect-editor-dialog/defect-editor-dialog.component';


@Component({
  selector: 'app-defects',
  templateUrl: './defects.component.html',
  styleUrls: ['./defects.component.scss']
})
export class DefectsComponent implements  OnInit {
  dataSource!: MatTableDataSource<DefectModel>;
  pageSize = 25;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnNames: Array<string> = ['name', 'code', 'operationName', 'operationCode','defectCategory', 'copy', 'edit', 'delete']
  title = "defects.title";

  constructor(private readonly defectDataService: DefectDataService,
    private readonly dialog: MatDialog,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.initalize();
  }

  initalize() {
    this.defectDataService.getAll().subscribe(products => {
      this.dataSource = new MatTableDataSource<DefectModel>(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
}
