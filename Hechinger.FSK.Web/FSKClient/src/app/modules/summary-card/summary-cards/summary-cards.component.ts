import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { DeleteSummaryCard, SummaryCardModel } from '../../../models/generated';
import { AccountService } from '../../../services/account.service';
import { SummaryCardDataService } from '../../../services/data/summary-card-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { SummaryCardEditorDialogComponent } from '../summary-card-editor-dialog/summary-card-editor-dialog.component';

@Component({
  selector: 'app-summary-cards',
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.scss']
})
export class SummaryCardsComponent implements OnInit {
  dataSource!: MatTableDataSource<SummaryCardModel>;
  pageSize = this.accountService.getPageSize();
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnNames: Array<string> = ['date', 'shiftName', 'workerName', 'operationCode', 'operationName', 'quantity', 'userName', 'created', 'edit','delete']
  title = "summarycard";

  constructor(private readonly summaryCardDataService: SummaryCardDataService,
    private readonly accountService: AccountService,
    private readonly dialog: MatDialog,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.initalize();
  }

  initalize() {
    this.summaryCardDataService.getAll().subscribe(cards => {
      this.dataSource = new MatTableDataSource<SummaryCardModel>(cards);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

 
  onEdit(data: SummaryCardModel) {
    let dialogRef = this.dialog.open(SummaryCardEditorDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: data.id,
      minWidth: '800px'
    });
    dialogRef.afterClosed().subscribe((result) => { if (result) this.initalize() });
  }
  
  onDelete(id: number) {
    let model: DeleteSummaryCard = { id: id };
    this.summaryCardDataService.delete(model).subscribe(result => {
      this.snackBar.open(result);
      if (result.isSuccess) this.initalize()

    });
  }
}

