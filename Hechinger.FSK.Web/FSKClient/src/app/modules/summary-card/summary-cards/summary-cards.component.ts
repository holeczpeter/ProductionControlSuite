import { OnDestroy } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { DeleteSummaryCard, IntervalModel, IntervalOption, SummaryCardModel, Views } from '../../../models/generated/generated';
import { TableColumnModel } from '../../../models/table-column-model';
import { AccountService } from '../../../services/account.service';
import { ConfirmDialogService } from '../../../services/confirm-dialog/confirm-dialog-service';
import { SummaryCardDataService } from '../../../services/data/summary-card-data.service';
import { IntervalViewService } from '../../../services/interval-view/interval-view.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { CompareService } from '../../../services/sort/sort.service';
import { DefectFilterService } from '../../../services/table/defect-filter.service';
import { PaginationService } from '../../../services/table/pagination.service';
import { SortService } from '../../../services/table/sort.service';
import { TableExportService } from '../../../services/table/table-export.service';
import { TableFilterService } from '../../../services/table/table-filter.service';
import { SummaryCardEditorDialogComponent } from '../summary-card-editor-dialog/summary-card-editor-dialog.component';

@Component({
  selector: 'app-summary-cards',
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.scss']
})
export class SummaryCardsComponent implements OnInit, OnDestroy {
  dataSource!: MatTableDataSource<SummaryCardModel>;
  pageSize = this.accountService.getPageSize();
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  intervalOptions: Array<IntervalOption> = [
    { name: 'day', value: Views.Day, isDefault: true },
    { name: 'week', value: Views.Week, isDefault: false },
    { name: 'month', value: Views.Month, isDefault: false },
    { name: 'year', value: Views.Year, isDefault: false },
  ];
  currentDate = new Date();
  selectedView: Views;
  currentInterval: IntervalModel;
  intervalSubscription: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnNames: Array<string> = ['date', 'shiftName','workerName', 'operationCode', 'operationName', 'quantity', 'userName', 'created', 'edit','delete']
  title = "summarycard";
  filterableColumns: Array<TableColumnModel> = [
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
      name: 'worker',
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
  filterableColumnNames: Array<string> = [
    'dateFilter',
    'shiftNameFilter',
    'workerNameFilter',
    'operationCodeFilter',
    'operationNameFilter',
    'quantityFilter',
    'userNameFilter',
    'createdFilter', 'more',];
  filterForm: UntypedFormGroup;
  totalCount!: number;
  constructor(private readonly summaryCardDataService: SummaryCardDataService,
    private readonly accountService: AccountService,
    private readonly intervalPanelService: IntervalViewService,
    private readonly dialog: MatDialog,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService,
    public tableFilterService: TableFilterService,
    public compareService: CompareService,
    public sortService: SortService,
    private readonly confirmDialogService: ConfirmDialogService,
    private readonly exportService: TableExportService,
    public paginationService: PaginationService,
    private readonly filterService: DefectFilterService) {
  }
  

  ngOnInit(): void {
    this.selectedView = this.intervalOptions.find(x => x.isDefault)!.value;
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();
    this.intervalSubscription = this.intervalPanelService.getCurrentIntervalModel()
      .pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
      .subscribe((x: IntervalModel) => {
        this.currentInterval = x;
        this.selectedView = x.selectedView;
        this.initalize();
      });
    this.intervalPanelService.setViews(this.selectedView, this.currentDate);
  }

  initalize() {
    this.summaryCardDataService.getAllSummaryCardsByParameters(this.currentInterval,null).subscribe(result => {
      this.totalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
      this.dataSource = new MatTableDataSource<SummaryCardModel>(result.body);
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
    this.dataSource = new MatTableDataSource<SummaryCardModel>(elements.body);
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
    this.summaryCardDataService.getAllSummaryCardsByParameters(this.currentInterval,null).subscribe((result: any) => {
      this.refreshDataSource(result);
    });
  }
  onExport() {
    this.summaryCardDataService.getAllSummaryCardsByParameters(this.currentInterval,this.totalCount).subscribe((result: any) => {
      this.totalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
      let dataSource = new MatTableDataSource<SummaryCardModel>(result.body);
      dataSource.sort = this.sort;
      this.translate.get(this.title).subscribe(title => {
        this.exportService.exportFromDataSource(dataSource, this.filterableColumns, title);
      });
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
    this.confirmDialogService.openDeleteConfirm('hibagyűjtőt').subscribe(result => {
      if (result) {
        let model: DeleteSummaryCard = { id: id };
        this.summaryCardDataService.delete(model).subscribe(result => {
          this.snackBar.open(result);
          if (result.isSuccess) this.initalize()

        });
      }
    });
   
  }
  ngOnDestroy(): void {
    this.filterForm.reset();
  }
}

