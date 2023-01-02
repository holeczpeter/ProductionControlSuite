import { Component, DoCheck, Input, IterableDiffer, IterableDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { addDays } from 'date-fns';
import format from 'date-fns/fp/format';
import * as XLSX from 'xlsx';
import { EnumModel, IntervalModel, QuantityOperationReportModel, ShiftModel } from '../../../../../models/generated/generated';
import { QuantityTableModel } from '../../../../../models/quantity-table-model';
import { TableColumn } from '../../../../../models/table-column';
import { TableColumnModel } from '../../../../../models/table-column-model';
import { TableHeader } from '../../../../../models/table-header';
import { ShiftDataService } from '../../../../../services/data/shift-data.service';
import { LanguageService } from '../../../../../services/language/language.service';
import { TableExportService } from '../../../../../services/table/table-export.service';

@Component({
  selector: 'app-operation-quantity-table',
  templateUrl: './operation-quantity-table.component.html',
  styleUrls: ['./operation-quantity-table.component.scss']
})
export class OperationQuantityTableComponent implements OnInit, OnChanges, DoCheck {
  @Input() tableModel: QuantityTableModel;
  @Input() shifts: ShiftModel[];
  @Input() categories: EnumModel[];
  interval: IntervalModel;
  model: QuantityOperationReportModel;
  columnsToDisplay: string[];
  displayedColumns: string[];
  dayHeaders: TableHeader[];
  shiftHeaders: TableHeader[];
  shiftQuantityHeaders: TableHeader[];
  dayColumns: string[];
  shiftColumns: string[];
  shiftQuantityColumns: string[];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  categorySumHeaders: TableHeader[];
  categoryPpmHeaders: TableHeader[];
  categorySumColumns: string[];
  categoryPpmColumns: string[];
  private _differShifts: IterableDiffer<any>;
  private _differCategories: IterableDiffer<any>;
  shiftChanges: any;
  categoryChanges: any;
  filterableColumns: Array<TableColumnModel>;
  constructor(public languageService: LanguageService,
    private differs: IterableDiffers,
    private readonly exportService: TableExportService,
    private readonly shiftDataServie: ShiftDataService) {
    this._differShifts = this.differs.find([]).create(this.trackByFn);
    this._differCategories = this.differs.find([]).create(this.trackByFn);
  }

  ngOnInit(): void {
  }
  
  ngDoCheck(): void {
    this.shiftChanges = this._differShifts.diff(this.shifts);
    this.categoryChanges = this._differCategories.diff(this.categories);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['tableModel'] && this.tableModel) || this.shiftChanges || this.categoryChanges) {
      this.interval = this.tableModel.interval;
      this.model = this.tableModel.model;
      this.createTable();
    } 
  }

  createTable() {
    if (this.interval && this.model && this.shifts && this.categories) {
      this.setInitial();
      let rows = new Array<TableColumn>();
      this.createHeaders();
      this.model.defects.forEach((defect, index) => {

        const row = new TableColumn();
        
        row['defect'] = { id: defect.defectId, code: defect.defectCode, name: defect.defectName, translatedName: defect.defectTranslatedName };
        for (let i = 0; i <= this.interval.differenceInCalendarDays; i++) {
         
          let currentDate = addDays(this.interval.startDate, i);
          let currentDateObjects = defect.days.filter(day => format('yyyy-MM-dd', new Date(day.date)).trim() == format('yyyy-MM-dd', currentDate).trim());

          for (var j = 0; j < this.shifts.length; j++) {
            if (index == 0) {
             
              let shiftQuantityModel = this.model.days
                .find(day => format('yyyy-MM-dd', new Date(day.date)).trim() == format('yyyy-MM-dd', currentDate).trim() && day.shiftId == this.shifts[j].id);
              let header = this.shiftQuantityHeaders.find(x => x.id == "q_" + currentDate.toString() + "_" + this.shifts[j].id);
              if (header) {
                header.value = shiftQuantityModel ? shiftQuantityModel.quantity :0;
              }
            }

            this.categories.forEach((c, catIndex) => {
              let currentDefectQuantity = currentDateObjects.find(x => x.shiftId == this.shifts[j].id);
              let defectQuantity = c.id == defect.defectCategory && currentDefectQuantity ? currentDefectQuantity.defectQuantity : '';
              row[currentDate.toString() + "_" + this.shifts[j].id + "_" + c.id] = { date: currentDate, shift: this.shifts[j].id, category: c, value: defectQuantity };
              let f: TableColumnModel = {
                name: currentDate.toString() + "_" + this.shifts[j].id + "_" + c.id,
                displayName: currentDate.toString() + "_" + this.shifts[j].id + "_" + c.id,
                columnDef: currentDate.toString() + "_" + this.shifts[j].id + "_" + c.id,
                exportable: true,
              }
              this.filterableColumns.push(f);
            });
          }
        }
        this.categories.forEach(c => {
          row['sum_q_' + c.id] = defect.defectCategory == c.id ? defect.defectQuantity : 0;
          row['sum_ppm_' + c.id] = defect.defectCategory == c.id ? defect.ppm : 0;

        });

        rows.push(row);

      });
      this.shiftQuantityColumns = [...this.shiftQuantityHeaders.map(x => x.id)];
      this.dayColumns = [...this.dayHeaders.map(x => x.id)];
      this.shiftColumns = [...this.shiftHeaders.map(x => x.id)];
    
      this.filterableColumns.push()
      this.dataSource = new MatTableDataSource(rows);
    }
  }
    setInitial() {
      this.dataSource = new MatTableDataSource();
      this.columnsToDisplay = [...[]];
      this.displayedColumns = [...[]];
      this.dayHeaders = [...[]];
      this.shiftHeaders = [...[]];
      this.shiftQuantityHeaders = [...[]];
      this.dayColumns = [...[]];
      this.shiftColumns = [...[]];
      this.categorySumHeaders = [...[]];
      this.categoryPpmHeaders = [...[]];
      this.categorySumColumns = [...[]];
      this.categoryPpmColumns = [...[]];
      this.filterableColumns = [...[]];
    }

  createHeaders() {
    this.displayedColumns.push("defect");
    for (let i = 0; i <= this.interval.differenceInCalendarDays; i++) {
      let currentDate = addDays(this.interval.startDate, i);
      this.dayHeaders.push({ id: currentDate.toString(), value: currentDate });
      for (var j = 0; j < this.shifts.length; j++) {
        this.shiftHeaders.push({ id: currentDate.toString() + "_" + this.shifts[j].id, value: { id: this.shifts[j].id, name: this.shifts[j].name, translatedName: this.shifts[j].translatedName } });
        this.shiftQuantityHeaders.push({ id: "q_" + currentDate.toString() + "_" + this.shifts[j].id, value: '' });
        this.categories.forEach((c, catIndex) => {
          this.displayedColumns.push(currentDate.toString() + "_" + this.shifts[j].id + "_" + c.id)
        });
      }
    }
    this.categories.forEach(x => {
      this.displayedColumns.push('sum_q_' + x.id);

    });
    this.categories.forEach(x => {

      this.displayedColumns.push('sum_ppm_' + x.id);
    });
    this.columnsToDisplay = [...this.displayedColumns];
  }

  getShiftName(header: string) {
    const myArray = header.split("_");
    return this.shifts.find(x => x.id.toString() == myArray[1])?.name;
  }

  getColSpanAfterOperation() {
    return ((this.interval.differenceInCalendarDays + 1) * this.shifts.length * 3) + 3;
  }

  getColSpanShift() {
    return this.shifts ? this.shifts.length : 0;
  }

  getColSpanDay() {
    return this.shifts ? this.shifts.length * 3 : 3;
  }

  isShift(index: number, item: any): boolean {
    return item.isShift;
  }

  isDay(index: number, item: any): boolean {
    return item.isDay;
  }

  isOperation(index: number, item: any): boolean {
    return item.isOperation;
  }
  trackByFn(index: number, item: any) {
    return index;
  }
  onExport() {
    var tbl = document.getElementById('id_of_table');
    var wb = XLSX.utils.table_to_book(tbl, { sheet: "nameofsheet" });
    XLSX.writeFile(wb, `${this.interval.startDate.toDateString()}_` + `${this.interval.endDate.toDateString()}_` + `${ this.model.operationCode }` + `.xlsx`);
  }
  getCategory(categoryId: string) {
    const myArray = categoryId.split("_");
    switch (myArray[2]) {
      case '0': return "#FFCA39";
      case '1': return "#F35B5A";
      case '2': return "#379DDA";
      default:
        return "#F35B5A";
    }
  }
}
