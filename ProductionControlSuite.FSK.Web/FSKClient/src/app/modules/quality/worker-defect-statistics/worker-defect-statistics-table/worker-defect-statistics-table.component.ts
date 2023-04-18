import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import * as XLSX from 'xlsx';
import { DefectStatisticModel, DefectStatisticsItem } from '../../../../models/generated/generated';
import { AccountService } from '../../../../services/account.service';

@Component({
  selector: 'app-worker-defect-statistics-table',
  templateUrl: './worker-defect-statistics-table.component.html',
  styleUrls: ['./worker-defect-statistics-table.component.scss']
})

export class WorkerDefectStatisticsTableComponent implements OnInit, OnChanges {
  @Input() model: DefectStatisticModel;
  dataSource: MatTableDataSource<DefectStatisticsItem>;
  columnNames: Array<string> = ['defectCode', 'defectName', 'defectTranslatedName', 'defectCategoryName', 'quantity', 'defectQuantity', 'ppm'];
  pageSize = this.accountService.getPageSize();
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private readonly accountService: AccountService,
    private readonly datePipe: DatePipe,
    public translateService: TranslateService) { }
  
  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] && this.model) this.createTable();
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
    var wb = XLSX.utils.table_to_book(tbl, { sheet: this.model.operationCode + "_" + this.model.workerCode });
    XLSX.writeFile(wb, `${startDate}_` + `${endDate}_` + `${this.model.operationCode + "_" + this.model.workerCode}` + `.xlsx`);
  }
}
