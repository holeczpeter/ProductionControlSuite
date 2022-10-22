import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { DeleteSummaryCard, SummaryCardModel } from '../../../models/generated';
import { TableColumn } from '../../../models/table-column';
import { AccountService } from '../../../services/account.service';
import { SummaryCardDataService } from '../../../services/data/summary-card-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { SortService } from '../../../services/sort/sort.service';
import { TableFilterService } from '../../../services/table/table-filter.service';
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
  filterableColumns: Array<TableColumn> = [
    {
      name: 'date',
      displayName: 'Dátum',
      exportable: true,
      columnDef: 'dateFilter'
    },
    {
      name: 'shiftName',
      displayName: 'Műszak',
      exportable: true,
      columnDef: 'shiftNameFilter'
    },
    {
      name: 'workerName',
      displayName: 'Dolgozó',
      exportable: true,
      columnDef: 'workerNameFilter'
    },
    {
      name: 'operationCode',
      displayName: 'Művelet kód',
      exportable: true,
      columnDef: 'operationCodeFilter'
    },
    {
      name: 'operationName',
      displayName: 'Művelet',
      exportable: true,
      columnDef: 'operationNameFilter'
    },
    {
      name: 'quantity',
      displayName: 'Mennyiség',
      exportable: true,
      columnDef: 'quantityFilter'
    },
    {
      name: 'userName',
      displayName: 'Felhasználó',
      exportable: true,
      columnDef: 'userNameFilter'
    },
    {
      name: 'created',
      displayName: 'Rögzítés időpontja',
      exportable: true,
      columnDef: 'createdFilter'
    },
  ];
  filterableColumnNames: Array<string> = ['dateFilter', 'shiftNameFilter', 'workerNameFilter', 'operationCodeFilter', 'operationNameFilter', 'quantityFilter', 'userNameFilter','createdFilter', 'more',];
  filterForm: UntypedFormGroup;
  constructor(private readonly summaryCardDataService: SummaryCardDataService,
    private readonly accountService: AccountService,
    private readonly dialog: MatDialog,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService, public sortService: SortService,
    public tableFilterService: TableFilterService ) { }

  ngOnInit(): void {
    this.initalize();
  }

  initalize() {
    this.summaryCardDataService.getAll().subscribe(cards => {
      this.dataSource = new MatTableDataSource<SummaryCardModel>(cards);
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
  refreshDataSource(elements: Array<SummaryCardModel>): void {
    this.dataSource = new MatTableDataSource<SummaryCardModel>(elements);
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
        case 'date': return this.sortService.compareDate(a.date, b.date, isAsc);
        case 'shiftName': return this.sortService.compareString(a.shiftName, b.shiftName, isAsc);
        case 'workerName': return this.sortService.compareString(a.workerName, b.workerName, isAsc);
        case 'operationCode': return this.sortService.compareString(a.operationCode, b.operationCode, isAsc);
        case 'operationName': return this.sortService.compareString(a.operationName, b.operationName, isAsc);
        case 'quantity': return this.sortService.compareNumber(a.quantity, b.quantity, isAsc);
        case 'userName': return this.sortService.compareString(a.userName, b.userName, isAsc);
        case 'created': return this.sortService.compareDate(a.created, b.created, isAsc);
        default: return 0;
      }
    });
    this.refreshDataSource(sortedData);
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

