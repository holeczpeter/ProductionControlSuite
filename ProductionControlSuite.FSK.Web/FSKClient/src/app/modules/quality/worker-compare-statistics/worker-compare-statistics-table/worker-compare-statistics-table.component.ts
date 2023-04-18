import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WorkerStatisticsItem, WorkerStatisticsModel } from '../../../../models/generated/generated';
import { AccountService } from '../../../../services/account.service';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-worker-compare-statistics-table',
  templateUrl: './worker-compare-statistics-table.component.html',
  styleUrls: ['./worker-compare-statistics-table.component.scss']
})

export class WorkerCompareStatisticsTableComponent implements OnInit,OnChanges {
  @Input() model: WorkerStatisticsModel;
  dataSource: MatTableDataSource<WorkerStatisticsItem>;
  columnNames: Array<string> = ['workerCode', 'quantity', 'defectQuantity', 'ppm'];
  pageSize = this.accountService.getPageSize();
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private accountService: AccountService,
    private readonly datePipe: DatePipe,
    public translateService: TranslateService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] && this.model) this.createTable();
  }
   
  ngOnInit(): void {
  }
  
  createTable() {
    this.dataSource = new MatTableDataSource(this.model.items);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  onExport() {
    let startDate = this.translateService.currentLang == 'hu' ?
      this.datePipe.transform(this.model.startDate, 'yyyy.MM.dd') :
      this.datePipe.transform(this.model.startDate, 'dd.MM.yyyy');
    let endDate = this.translateService.currentLang == 'hu' ?
      this.datePipe.transform(this.model.startDate, 'yyyy.MM.dd') :
      this.datePipe.transform(this.model.endDate, 'dd.MM.yyyy');
    var tbl = document.getElementById('table');
    var tbl = document.getElementById('table');
    var wb = XLSX.utils.table_to_book(tbl, { sheet: this.model.defectName });
    XLSX.writeFile(wb, `${startDate}_` + `${endDate}_` + `${this.model.defectName}` + `.xlsx`);
  }
}
