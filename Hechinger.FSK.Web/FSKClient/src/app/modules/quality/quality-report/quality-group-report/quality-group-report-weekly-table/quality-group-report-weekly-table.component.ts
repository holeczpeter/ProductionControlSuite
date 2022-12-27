import { OnChanges } from '@angular/core';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { EnumModel, GroupReportModel, IntervalModel, QuantityOperationReportModel } from '../../../../../models/generated/generated';
import { DefectDataService } from '../../../../../services/data/defect-data.service';
import { ProductDataService } from '../../../../../services/data/product-data.service';
import { QualityDataService } from '../../../../../services/data/quality-data.service';
import { ShiftDataService } from '../../../../../services/data/shift-data.service';
import { IntervalViewService } from '../../../../../services/interval-view/interval-view.service';
import { LanguageService } from '../../../../../services/language/language.service';
import { addDays } from 'date-fns';
import format from 'date-fns/fp/format';
import * as XLSX from 'xlsx';
import { TableColumn } from '../../../../../models/table-column';
import { MatTableDataSource } from '@angular/material/table';
import { TableHeader } from '../../../../../models/table-header';
import { TableColumnModel } from '../../../../../models/table-column-model';
@Component({
  selector: 'app-quality-group-report-weekly-table',
  templateUrl: './quality-group-report-weekly-table.component.html',
  styleUrls: ['./quality-group-report-weekly-table.component.scss']
})
export class QualityGroupReportWeeklyTableComponent implements OnInit, OnChanges{
  @Input() result: GroupReportModel;
  categories: EnumModel[];
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
  shiftChanges: any;
  categoryChanges: any;
  filterableColumns: Array<TableColumnModel>;
  constructor(private readonly qualityDataService: QualityDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private intervalPanelService: IntervalViewService,
    private productDataService: ProductDataService,
    private readonly defectDataService: DefectDataService,
    public languageService: LanguageService,
    private readonly shiftDataServie: ShiftDataService,) { }

  ngOnInit(): void {
    this.defectDataService.getAllDefectCategories().subscribe(res => {
      this.categories = res;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["result"] && this.result) this.initalize();
  }
  initalize() {
    
  }
  createTable() {
    //if (this.interval && this.model &&  this.categories) {
    //  this.setInitial();
    //  let rows = new Array<TableColumn>();
    //  this.createHeaders();
    //  this.model.defects.forEach((defect, index) => {

    //    const row = new TableColumn();

    //    row['defect'] = { id: defect.defectId, code: defect.defectCode, name: defect.defectName, translatedName: defect.defectTranslatedName };
    //    for (let i = 0; i <= this.interval.differenceInCalendarDays; i++) {

    //      let currentDate = addDays(this.interval.startDate, i);
    //      let currentDateObjects = defect.days.filter(day => format('yyyy-MM-dd', new Date(day.date)).trim() == format('yyyy-MM-dd', currentDate).trim());

    //      for (var j = 0; j < this.shifts.length; j++) {
    //        if (index == 0) {

    //          let shiftQuantityModel = this.model.days
    //            .find(day => format('yyyy-MM-dd', new Date(day.date)).trim() == format('yyyy-MM-dd', currentDate).trim() && day.shiftId == this.shifts[j].id);
    //          let header = this.shiftQuantityHeaders.find(x => x.id == "q_" + currentDate.toString() + "_" + this.shifts[j].id);
    //          if (header) {
    //            header.value = shiftQuantityModel ? shiftQuantityModel.quantity : 0;
    //          }
    //        }

    //        this.categories.forEach((c, catIndex) => {
    //          let currentDefectQuantity = currentDateObjects.find(x => x.shiftId == this.shifts[j].id);
    //          let defectQuantity = c.id == defect.defectCategory && currentDefectQuantity ? currentDefectQuantity.defectQuantity : '';
    //          row[currentDate.toString() + "_" + this.shifts[j].id + "_" + c.id] = { date: currentDate, shift: this.shifts[j].id, category: c, value: defectQuantity };
    //          let f: TableColumnModel = {
    //            name: currentDate.toString() + "_" + this.shifts[j].id + "_" + c.id,
    //            displayName: currentDate.toString() + "_" + this.shifts[j].id + "_" + c.id,
    //            columnDef: currentDate.toString() + "_" + this.shifts[j].id + "_" + c.id,
    //            exportable: true,
    //          }
    //          this.filterableColumns.push(f);
    //        });
    //      }
    //    }
    //    this.categories.forEach(c => {
    //      row['sum_q_' + c.id] = defect.defectCategory == c.id ? defect.defectQuantity : 0;
    //      row['sum_ppm_' + c.id] = defect.defectCategory == c.id ? defect.ppm : 0;

    //    });

    //    rows.push(row);

    //  });
    //  this.shiftQuantityColumns = [...this.shiftQuantityHeaders.map(x => x.id)];
    //  this.dayColumns = [...this.dayHeaders.map(x => x.id)];
    //  this.shiftColumns = [...this.shiftHeaders.map(x => x.id)];

    //  this.filterableColumns.push()
    //  this.dataSource = new MatTableDataSource(rows);
    //}
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
    //this.displayedColumns.push("defect");
    //for (let i = 0; i <= this.interval.differenceInCalendarDays; i++) {
    //  let currentDate = addDays(this.interval.startDate, i);
    //  this.dayHeaders.push({ id: currentDate.toString(), value: currentDate });
    //  for (var j = 0; j < this.shifts.length; j++) {
    //    this.shiftHeaders.push({ id: currentDate.toString() + "_" + this.shifts[j].id, value: { id: this.shifts[j].id, name: this.shifts[j].name, translatedName: this.shifts[j].translatedName } });
    //    this.shiftQuantityHeaders.push({ id: "q_" + currentDate.toString() + "_" + this.shifts[j].id, value: '' });
    //    this.categories.forEach((c, catIndex) => {
    //      this.displayedColumns.push(currentDate.toString() + "_" + this.shifts[j].id + "_" + c.id)
    //    });
    //  }
    //}
    //this.categories.forEach(x => {
    //  this.displayedColumns.push('sum_q_' + x.id);

    //});
    //this.categories.forEach(x => {

    //  this.displayedColumns.push('sum_ppm_' + x.id);
    //});
    //this.columnsToDisplay = [...this.displayedColumns];
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
    //XLSX.writeFile(wb, `${this.interval.startDate.toDateString()}_` + `${this.interval.endDate.toDateString()}_` + `${this.model.operationCode}` + `.xlsx`);
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
