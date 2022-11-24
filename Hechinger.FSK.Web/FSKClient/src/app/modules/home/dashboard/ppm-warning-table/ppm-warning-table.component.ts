import { Component, DoCheck, Input, IterableDiffer, IterableDiffers, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { PpmWarning } from '../../../../models/generated/generated';
import { AccountService } from '../../../../services/account.service';
import { DashboardDataService } from '../../../../services/data/dashboard-data.service';
import { LanguageService } from '../../../../services/language/language.service';

@Component({
  selector: 'app-ppm-warning-table',
  templateUrl: './ppm-warning-table.component.html',
  styleUrls: ['./ppm-warning-table.component.scss']
})
export class PpmWarningTableComponent implements OnInit, DoCheck {
  @Input() ppmWarningList: Array<PpmWarning>;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['operationName', 'operationCode','date','shift', 'quantity', 'defectQuantity','summaryGoal', 'ppm','icon'];
  dataSource: MatTableDataSource<PpmWarning>;
  private _differ: IterableDiffer<any>;

  constructor(private dashBoardDataService: DashboardDataService,
    private readonly accountService: AccountService,
    public languageService: LanguageService,
    private differs: IterableDiffers) {
    this._differ = this.differs.find([]).create();
  }

  ngOnInit(): void {
  }

  ngDoCheck() {
    var changes = this._differ.diff(this.ppmWarningList);
    if (changes) {
      this.dataSource = new MatTableDataSource(this.ppmWarningList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}

