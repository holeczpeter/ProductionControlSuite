import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CrapCostTableModel } from '../../../../models/crap-cost-table-model';
import { CrapCostProductModel, IntervalModel } from '../../../../models/generated/generated';
import { TableColumn } from '../../../../models/table-column';
import { addDays } from 'date-fns';
import format from 'date-fns/fp/format';
import { MatTableDataSource } from '@angular/material/table';
import { TableHeader } from '../../../../models/table-header';
import * as XLSX from 'xlsx';
import { LanguageService } from '../../../../services/language/language.service';
@Component({
  selector: 'app-crap-cost-table',
  templateUrl: './crap-cost-table.component.html',
  styleUrls: ['./crap-cost-table.component.scss']
})
export class CrapCostTableComponent implements OnInit, OnChanges {
  @Input() model: CrapCostTableModel;
  crapCostProductModel: CrapCostProductModel;
  interval: IntervalModel;
  headers: Array<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  columnsToDisplay: Array<string>;

  constructor(public languageService: LanguageService) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['model'] && this.model)) {
      this.interval = this.model.interval;
      this.crapCostProductModel = this.model.model;
      this.createTable();
    }
  }
  createTable() {
    if (this.interval && this.crapCostProductModel) {
      let rows = new Array<TableColumn>();
      const row = new TableColumn();
      this.crapCostProductModel.operations.forEach((operation, index) => {
          row['item'] = { id: operation.operationId, code: operation.operationCode, name: operation.operationName, translatedName: operation.operationTranslatedName };
          for (let i = 0; i <= this.interval.differenceInCalendarDays; i++) {

            let currentDate = addDays(this.interval.startDate, i);
            let currentDateItem = operation.days.find(day => format('yyyy-MM-dd', new Date(day.date)).trim() == format('yyyy-MM-dd', currentDate).trim());
            row[currentDate.toString()] = currentDateItem;
          }
          row['sum'] = operation.value;
          rows.push(row);
        });
        this.dataSource = new MatTableDataSource(rows);
        this.columnsToDisplay = [...Object.keys(rows[0])];
        this.headers = this.createDateHeaders(rows);
    }
  }
  createDateHeaders(rows: Array<any>): any[] {
    if (rows.length == 0) return new Array<any>();
    return [...Object.keys(rows[0])
      .filter(x => x != 'item' && x!='sum')
      .map(x => {
        return x
      })
    ];
  }
  getProductValueByDay(date: Date) {
    let currentDate = new Date(date);
    let sum = 0;
    this.crapCostProductModel.operations.forEach(x => {
      let element = x.days.find(day => format('yyyy-MM-dd', new Date(day.date)).trim() == format('yyyy-MM-dd', currentDate).trim());
      sum += element ? element.value : 0;
    });
    return sum;
  }
  getProductTotalValue() {
    return this.crapCostProductModel.value;
  }
  onExport() {
    var tbl = document.getElementById('id_of_table');
    var wb = XLSX.utils.table_to_book(tbl, { sheet: "nameofsheet" });
    XLSX.writeFile(wb, `${this.interval.startDate.toDateString()}_` + `${this.interval.endDate.toDateString()}_` + `.xlsx`);
  }
}
