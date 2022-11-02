import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DefectCategories, IntervalModel, QuantityOperationReportModel, QuantityProductReportModel, ShiftModel } from '../../../../models/generated/generated';
import { TableColumn } from '../../../../models/table-column';
import { AccountService } from '../../../../services/account.service';
import { ProductDataService } from '../../../../services/data/product-data.service';
import { QualityDataService } from '../../../../services/data/quality-data.service';
import { ShiftDataService } from '../../../../services/data/shift-data.service';
import { IntervalViewService } from '../../../../services/interval-view/interval-view.service';
import { LanguageService } from '../../../../services/language/language.service';
import { addDays } from 'date-fns';
import format from 'date-fns/fp/format';
class Column {
  [key: string]: any
}
class TableHeader {
  id: string;
  value: any;
}
@Component({
  selector: 'app-daily-quantity-table',
  templateUrl: './daily-quantity-table.component.html',
  styleUrls: ['./daily-quantity-table.component.scss']
})
export class DailyQuantityTableComponent implements OnInit, OnChanges {
  @Input() data: QuantityProductReportModel;
  @Input() intervalModel: IntervalModel;
  shifts: ShiftModel[];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  categories = Object.values(DefectCategories).filter((v) => !isNaN(Number(v)));
  headers = new Array<string>();
  constructor(private readonly qualityDataService: QualityDataService,
    private readonly productDataService: ProductDataService,
    public languageService: LanguageService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly accountService: AccountService,
    private readonly shiftDataServie: ShiftDataService,
    private intervalPanelService: IntervalViewService) { }


  ngOnInit(): void {
    this.shiftDataServie.getAll().subscribe(shifts => {
      this.shifts = shifts;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
   
    if (changes['data'] && this.data) {
      console.log(changes)
      this.createDataSource();
    }
  }
  createDataSource() {
    let rows = new Array<Column>();

    this.data.operations.forEach((operation, opindex) => {
      const dayQuantitySumRow = new Column();
      const shiftQuantitySumRow = new Column();
      const defectQuantitySumRow = new Column();
      operation.defects.forEach((defect, index) => {
        const defectRow = new Column();

        defectRow['defect'] = { id: defect.defectId, name: defect.defectName, translatedName: defect.defectTranslatedName };
        for (var i = 0; i < this.intervalModel.differenceInCalendarDays; i++) {
          let currentDate = addDays(this.intervalModel.startDate, i);
          let currentDateObject = defect.days.find(day => format('yyyy-MM-dd', new Date(day.date)).trim() == format('yyyy-MM-dd', currentDate).trim());
          if (index == 0) {

            let currentSumValue = this.getDayQuantity(operation, currentDate);
            dayQuantitySumRow[currentDate.toString()] =
              { date: currentDate, value: currentSumValue };
            rows.push(dayQuantitySumRow);
          }

          for (var j = 0; j < this.shifts.length; j++) {
            let currentShiftObject = currentDateObject ? currentDateObject.shifts.find(s => s.shiftId == this.shifts[j].id) : null;
            if (index == 0) {

              let currentSumValue = this.getShiftQuantity(operation, currentDate, this.shifts[j].id);
              shiftQuantitySumRow[currentDate.toString() + "_" + this.shifts[j].id]=
                { date: currentDate, shift: this.shifts[j].id, value: currentSumValue };
              rows.push(shiftQuantitySumRow);
            }

            this.categories.forEach((c: DefectCategories) => {
              if (index == 0) {

                let currentSumValue = this.getSumQuantity(operation, currentDate, this.shifts[j].id, c);
                defectQuantitySumRow[currentDate.toString() + "_" + this.shifts[j].id + "_" + c] =
                  { date: currentDate, shift: this.shifts[j].id, category: c, value: currentSumValue };
                rows.push(defectQuantitySumRow);
              }
              let currentValue = defect.defectCategory === c && currentShiftObject ? currentShiftObject?.defectQuantity : '';
              defectRow[currentDate.toString() + "_" + this.shifts[j].id + "_" + c] =
                { date: currentDate, shift: this.shifts[j].id, category: c, value: currentValue };
            });
          }
        }
        rows.push(defectRow);
      });
      
    });
    this.headers = [...Object.keys(rows[0])];
    this.dataSource = new MatTableDataSource(rows);
    console.log(rows)
    console.log(this.headers)
    

  } 
  getDayQuantity(operation: QuantityOperationReportModel, currentDate: Date) {
    let items = operation.defects.flatMap(f => { return f.days.filter(d => d.date == currentDate) }).flatMap(day => { return day.shifts });
    return items.map(x => x.quantity).reduce((a, b) => a + b, 0);
  }
  getShiftQuantity(operation: QuantityOperationReportModel, currentDate: Date, shiftId:number) {
    let items = operation.defects.flatMap(f => { return f.days.filter(d => d.date == currentDate) }).flatMap(day => { return day.shifts });
    return items.filter(x => x.shiftId == shiftId).map(x => x.defectQuantity).reduce((a, b) => a + b, 0);
  }
  getSumQuantity(operation: QuantityOperationReportModel, date: Date, shiftId: number, category: DefectCategories) {
    let items = operation.defects.filter(x => x.defectCategory == category).flatMap(f => { return f.days.filter(d => d.date == date) }).flatMap(day => { return day.shifts });
    return items.filter(x => x.shiftId == shiftId).map(x => x.defectQuantity).reduce((a, b) => a + b, 0);

  }
}
