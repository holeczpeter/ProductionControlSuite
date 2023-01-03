import { DatePipe } from '@angular/common';
import { Component, DoCheck, Input, IterableDiffer, IterableDiffers, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DefectCategories, GroupReportYearlySummaryModel } from '../../../../../models/generated/generated';
import { DateService } from '../../../../../services/date.service';
import { TableExportService } from '../../../../../services/table/table-export.service';
import { QualityMonthlyTable } from '../quality-report-yearly-summary.component';

@Component({
  selector: 'app-quality-report-yearly-summary-table',
  templateUrl: './quality-report-yearly-summary-table.component.html',
  styleUrls: ['./quality-report-yearly-summary-table.component.scss']
})
export class QualityReportYearlySummaryTableComponent implements OnInit, DoCheck, OnDestroy {
  @Input() items: Array<GroupReportYearlySummaryModel>;
  categories = DefectCategories;
  dataSource: MatTableDataSource<QualityMonthlyTable> = new MatTableDataSource([]);
  columnNames: Array<string> = ['month', 'f0', 'f1', 'f2'];
  monthDataSubscription: Subscription;
  private _differ: IterableDiffer<any>;

  constructor(private differs: IterableDiffers,
    private readonly dateService: DateService,
    private readonly datePipe: DatePipe,
    private readonly tableExportService: TableExportService,
    public translateService: TranslateService) {
    this._differ = this.differs.find([]).create(this.trackByFn);

  }

  ngOnInit(): void {

  }
  ngDoCheck() {
    var changes = this._differ.diff(this.items);
    if (changes) this.createDataSource();
  }

  createDataSource() {
    if (this.monthDataSubscription) this.monthDataSubscription.unsubscribe();
    this.monthDataSubscription = this.dateService.getMonthExtension().subscribe(monthExtensions => {
      this.dataSource = new MatTableDataSource<QualityMonthlyTable>();
      let rows = new Array<QualityMonthlyTable>();
      monthExtensions.forEach(month => {
        let row = new QualityMonthlyTable();
        row.month = month.name;
        this.items.forEach(res => {
          let item;
          switch (res.category) {
            case 0:
              item = res.items.find(x => x.month == month.value);
              if (item) row.f0 = item.value;
              else row.f0 = 0;
              break;
            case 1:
              item = res.items.find(x => x.month == month.value);
              if (item) row.f1 = item.value;
              else row.f1 = 0;
              break;
            case 2:
              item = res.items.find(x => x.month == month.value);
              if (item) row.f2 = item.value;
              else row.f2 = 0;
              break;
          }
        });
        rows.push(row)
      })
      this.dataSource.data = rows;
    });
  }
  getAvarage(category: number): number {
    if (this.items) {
      let categoryObject = this.items.find(x => x.category == category);
      if (categoryObject) {
        return categoryObject.items.map(x => x.value).reduce((a, b) => a + b, 0) / categoryObject.items.length;
      }
      else return 0;
    }
    else return 0;
  }
  onExport() {
    let first = this.items[0];
    let name = `${first.year}_` + `${first.productCode}` + `.xls`;
    var tbl = document.getElementById("table");
    if (tbl) {
      this.tableExportService.exportTableFromInnerHTML(tbl, name);
    }
  }
  trackByFn(index: number, item: any) {
    return index;
  }
  ngOnDestroy() {
    if (this.monthDataSubscription) this.monthDataSubscription.unsubscribe();
  }
}
