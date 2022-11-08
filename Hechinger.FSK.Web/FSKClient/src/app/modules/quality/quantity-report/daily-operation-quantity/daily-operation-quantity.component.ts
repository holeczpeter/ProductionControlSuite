import { Component, DoCheck, Input, IterableDiffer, IterableDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DefectCategories, EnumModel, IntervalModel, QuantityOperationReportModel, ShiftModel } from '../../../../models/generated/generated';
import { addDays } from 'date-fns';
import format from 'date-fns/fp/format';
import { MatTableDataSource } from '@angular/material/table';
import { LanguageService } from '../../../../services/language/language.service';
import { ShiftDataService } from '../../../../services/data/shift-data.service';
class TableColumn {
  [key: string]: any
}

class TableHeader {
  id: string;
  value: any;
}

@Component({
  selector: 'app-daily-operation-quantity',
  templateUrl: './daily-operation-quantity.component.html',
  styleUrls: ['./daily-operation-quantity.component.scss']
})
export class DailyOperationQuantityComponent implements OnInit, OnChanges, DoCheck {
  @Input() model: QuantityOperationReportModel;
  @Input() interval: IntervalModel;
  @Input() shifts: ShiftModel[];
  @Input() categories: EnumModel[];
  columnsToDisplay: string[];
  displayedColumns: string[];
  dayHeaders: TableHeader[];
  shiftHeaders: TableHeader[];
  shiftQuantityHeaders: TableHeader[];
  dayColumns: string[];
  shiftColumns: string[];
  shiftQuantityColumns: string[];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  private _differ: IterableDiffer<any>;
  categorySumHeaders: TableHeader[];
  categoryPpmHeaders: TableHeader[];
  categorySumColumns: string[];
  categoryPpmColumns: string[];
  constructor(public languageService: LanguageService,
    private differs: IterableDiffers,
    private readonly shiftDataServie: ShiftDataService) {
    this._differ = this.differs.find([]).create();
  }
    
    

  ngOnInit(): void {
  
  }
  ngDoCheck(): void {
    var changes = this._differ.diff(this.shifts);
    var changes2 = this._differ.diff(this.categories);
    if (changes) this.createTable();
    if (changes2) this.createTable();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] && changes['interval'] && this.model && this.interval) this.createTable();
   
  }
  createTable() {
    if (this.interval && this.model && this.shifts && this.categories) {
      this.dataSource = new MatTableDataSource();

      this.columnsToDisplay = new Array<string>();
      this.displayedColumns = new Array<string>();
      this.dayHeaders = new Array<TableHeader>();
      this.shiftHeaders = new Array<TableHeader>();
      this.shiftQuantityHeaders = new Array<TableHeader>();
      this.dayColumns = new Array<string>();
      this.shiftColumns = new Array<string>();
      this.categorySumHeaders = new Array<TableHeader>();
      this.categoryPpmHeaders = new Array<TableHeader>();
      this.categorySumColumns = new Array<string>();
      this.categoryPpmColumns = new Array<string>();
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
                header.value = shiftQuantityModel ? shiftQuantityModel.quantity : '';
              }
            }

            this.categories.forEach((c, catIndex) => {
              let currentDefectQuantity = currentDateObjects.find(x => x.shiftId == this.shifts[j].id);
              let defectQuantity = c.id == defect.defectCategory && currentDefectQuantity ? currentDefectQuantity.defectQuantity : '';
              row[currentDate.toString() + "_" + this.shifts[j].id + "_" + c.id] = { date: currentDate, shift: this.shifts[j].id, category: c, value: defectQuantity };

            });
          }
        }
        this.categories.forEach(c => {
          row['sum_q_' + c.id] = defect.defectCategory == c.id ? defect.defectQuantity : 0;
          row['sum_ppm_' + c.id] = defect.defectCategory == c.id ? defect.pPM : 0;
         
        });
       
        rows.push(row);
       
      });
      this.shiftQuantityColumns = [...this.shiftQuantityHeaders.map(x => x.id)];
      this.dayColumns = [...this.dayHeaders.map(x => x.id)];
      this.shiftColumns = [...this.shiftHeaders.map(x => x.id)];
      this.dataSource = new MatTableDataSource(rows);
    }
  }
  createHeaders() {
   
   
    this.displayedColumns.push("defect");
    for (let i = 0; i <= this.interval.differenceInCalendarDays; i++) {
      let currentDate = addDays(this.interval.startDate, i);
      this.dayHeaders.push({ id: currentDate.toString(), value: currentDate });
      for (var j = 0; j < this.shifts.length; j++) {
        this.shiftHeaders.push({ id: currentDate.toString() + "_" + this.shifts[j].id, value: { id: this.shifts[j].id, name: this.shifts[j].name, translatedName: this.shifts[j].translatedName } });
        this.shiftQuantityHeaders.push({ id: "q_" + currentDate.toString() + "_" + this.shifts[j].id, value:''});
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
    return this.shifts ? this.shifts.length * 3 :3;
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
