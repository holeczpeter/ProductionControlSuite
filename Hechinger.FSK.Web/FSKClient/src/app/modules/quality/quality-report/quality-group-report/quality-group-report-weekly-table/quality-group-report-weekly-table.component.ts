import { OnChanges } from '@angular/core';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { EnumModel, GroupReportModel, IntervalModel, OperationItem, QuantityOperationReportModel, Views } from '../../../../../models/generated/generated';
import { DefectDataService } from '../../../../../services/data/defect-data.service';
import { ProductDataService } from '../../../../../services/data/product-data.service';
import { QualityDataService } from '../../../../../services/data/quality-data.service';
import { ShiftDataService } from '../../../../../services/data/shift-data.service';
import { IntervalViewService } from '../../../../../services/interval-view/interval-view.service';
import { LanguageService } from '../../../../../services/language/language.service';
import { addDays, getWeek } from 'date-fns';
import format from 'date-fns/fp/format';
import * as XLSX from 'xlsx';
import { TableColumn } from '../../../../../models/table-column';
import { MatTableDataSource } from '@angular/material/table';
import { TableHeader } from '../../../../../models/table-header';
import { TableColumnModel } from '../../../../../models/table-column-model';
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval'
export interface TableGroupItem {
  operationGroupId: number;
  operationGroupName: string;
  operationGroupCode: string;
  operationGroupTranslatedName: string;
  operationGroupCodes: string;
  operationItem: OperationItem;
  dataSource: MatTableDataSource<any>;
  operationCategorySumHeaders: TableHeader[];
  operationWeekSumHeaders: TableHeader[];
  operationCategorySumColumns: string[];
  operationWeekSumColumns: string[];
}

@Component({
  selector: 'app-quality-group-report-weekly-table',
  templateUrl: './quality-group-report-weekly-table.component.html',
  styleUrls: ['./quality-group-report-weekly-table.component.scss']
})

export class QualityGroupReportWeeklyTableComponent implements OnInit, OnChanges {
  @Input() result: GroupReportModel;
  @Input() interval: IntervalModel;

  tables: TableGroupItem[];
  categories: EnumModel[];
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
  weeksHeader: Array<string>;
  periods: Array<number>;
  public get views(): typeof Views {
    return Views;
  }

  constructor(private readonly qualityDataService: QualityDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private intervalPanelService: IntervalViewService,
    private productDataService: ProductDataService,
    private readonly defectDataService: DefectDataService,
    public languageService: LanguageService,
    private readonly shiftDataServie: ShiftDataService,) { }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["result"] || changes["interval"]) {
     
      if (!this.categories) {
        this.defectDataService.getAllDefectCategories().subscribe(res => {
          this.categories = res;
          this.createTable();
        });
      }
      else this.createTable();
    }
  }

  createTable() {
    this.setInitial();
    if (this.interval && this.result && this.categories) {
      this.createPeriods();
      
      this.result.items.forEach(operation => {
        let operationWeekSumColumns = [...new Array<string>()];
        let operationWeekSumHeaders = [...new Array<TableHeader>()];
        let operationCategorySumColumns = [...new Array<string>()];
        let operationCategorySumHeaders = [...new Array<TableHeader>()];

        this.periods.forEach(week => {
          if (!operationWeekSumColumns.includes(operation.operationId + "_" + week.toString() + "_sum")) {
            let currentModel = operation.periodItems.find(x => x.periodNumber == week);
            operationWeekSumHeaders.push({ id: operation.operationId + "_" + week.toString() + "_sum", value: currentModel ? currentModel.quantity : '0' })
            operationWeekSumColumns.push(operation.operationId + "_" + week.toString() + "_sum");
          }
        })
       
        
        let rows = new Array<TableColumn>();
        ///Összesítű sorok
        this.periods.forEach(week => {
          this.categories.forEach((c, catIndex) => {
            if (!operationCategorySumColumns.includes(operation.operationId + "_" + week.toString() + "_" + c.id + "_sum")) {
              const flattened = operation.defects.flatMap(num => num.periodItems).filter(x => x.defectCategory == c.id && x.periodNumber == week).map(x => x.defectQuantity).reduce((a, b) => a + b, 0);
              //let currentModel = operation.periodItems.find(x => x.periodNumber == week && x.defectCategory == c.id);
              operationCategorySumHeaders.push({ id: operation.operationId + "_" + week.toString() + "_" + c.id + "_sum", value: flattened })
              operationCategorySumColumns.push(operation.operationId + "_" + week.toString() + "_" + c.id + "_sum");
            }
          });
        })
       
        this.categories.forEach((c, catIndex) => {
          if (!operationCategorySumColumns.includes(c.id + "_sumq")) {
            const flattened = operation.defects.flatMap(num => num.periodItems).filter(x => x.defectCategory == c.id).map(x => x.defectQuantity).reduce((a, b) => a + b, 0);
            //let currentModel = operation.periodItems.filter(x => x.defectCategory == c.id).map(x => x.defectQuantity).reduce((a, b) => a + b, 0);
            operationCategorySumHeaders.push({ id: operation.operationId + "_" + c.id + "_sumq", value: flattened });
            operationCategorySumColumns.push(operation.operationId + "_" + c.id + "_sumq");
          }
        });
        this.categories.forEach((c, catIndex) => {
          if (!operationCategorySumColumns.includes(c.id + "_sumpp")) {
            const flattened = operation.defects.flatMap(num => num.periodItems).filter(x => x.defectCategory == c.id).map(x => x.ppm).reduce((a, b) => a + b, 0);
            //let currentModel = operation.periodItems.filter(x => x.defectCategory == c.id).map(x => x.ppm).reduce((a, b) => a + b, 0);
            operationCategorySumHeaders.push({ id: operation.operationId + "_" + c.id + "_sumpp", value: flattened });
            operationCategorySumColumns.push(operation.operationId + "_" + c.id + "_sumpp");
          }
        });

        //Defects sorok
        operation.defects.forEach(defect => {
          const row = new TableColumn();
          row['defect'] = { id: defect.defectId, code: defect.defectCode, name: defect.defectName, translatedName: defect.defectTranslatedName };
          this.periods.forEach(week => {
            let currentValues = defect.periodItems.filter(x => x.periodNumber == week);
            this.categories.forEach((c, catIndex) => {
              let currentModel = currentValues.find(x => x.defectCategory == c.id);
              row[week.toString() + "_" + c.id] = { week: week, category: c, value: currentModel ? currentModel?.defectQuantity : '' };
            });
          })
          
          this.categories.forEach(c => {
            row['sum_q_' + c.id] = defect.periodItems.filter(x => x.defectCategory == c.id).map(x => x.defectQuantity).reduce((a, b) => a + b, 0);;
            row['sum_ppm_' + c.id] = defect.periodItems.filter(x => x.defectCategory == c.id).map(x => x.ppm).reduce((a, b) => a + b, 0);;
          });
          rows.push(row);

        });

       
        let item: TableGroupItem = {
          operationGroupId: operation.operationId,
          operationGroupName: operation.operationName,
          operationGroupCode: operation.operationCode,
          operationGroupTranslatedName: operation.operationTranslatedName,
          operationGroupCodes: operation.operationCodes,
          operationItem: operation,
          dataSource: new MatTableDataSource(rows),
          operationCategorySumHeaders: operationCategorySumHeaders,
          operationWeekSumHeaders: operationWeekSumHeaders,
          operationCategorySumColumns: operationCategorySumColumns,
          operationWeekSumColumns: operationWeekSumColumns,
        }
        this.tables.push(item);
      });
      this.createHeaders();
    }
  }
  createPeriods() {
    if (this.interval.selectedView == Views.Month) {
      let dates = eachWeekOfInterval({ start: this.interval.startDate, end: this.interval.endDate });
      dates.forEach(x => {
        let week = getWeek(x, { weekStartsOn: 1 });
        this.periods.push(week);
      })
      
    }
    else if (this.interval.selectedView == Views.Year) {
      for (var i = 1; i <= 12; i++) {
        this.periods.push(i);
      }
    }
  }

  setInitial() {
    this.tables = [...[]];
    this.dataSource = new MatTableDataSource();
    this.periods = [...[]];
    this.weeksHeader = [...[]];
    this.columnsToDisplay = [...[]];
    this.displayedColumns = [...[]];
    this.categorySumHeaders = [...[]];
    this.categorySumColumns = [...[]];
  }

  createHeaders() {
    this.columnsToDisplay.push("defect");
    this.periods.forEach(period => {
      if (!this.weeksHeader.includes(period.toString())) this.weeksHeader.push(period.toString());
      this.categories.forEach((c, catIndex) => {

        if (!this.categorySumColumns.includes(period.toString() + "_" + c.id + "_" + "sum")) this.categorySumColumns.push(period.toString() + "_" + c.id + "_" + "sum");
        if (!this.columnsToDisplay.includes(period.toString() + "_" + c.id)) this.columnsToDisplay.push(period.toString() + "_" + c.id);
      });
    })
   
    this.categories.forEach(x => {
      this.columnsToDisplay.push('sum_q_' + x.id);
    });
    this.categories.forEach(x => {
      this.columnsToDisplay.push('sum_ppm_' + x.id);
    });
    
    this.columnsToDisplay = [...this.columnsToDisplay];
    this.displayedColumns = [...this.columnsToDisplay];
  }

  getSummary(operationGroupId: number) {
    return this.result.items.find(x => x.operationId == operationGroupId)?.quantity;
  }
  getGoal() {
    return 10;
  }
  getTotal() {
    return 20;
  }
  trackByFn(index: number, item: any) {
    return index;
  }
  onExport() {
    var tbl = document.getElementById('id_of_table');
    var wb = XLSX.utils.table_to_book(tbl, { sheet: "nameofsheet" });

    XLSX.writeFile(wb, `${this.interval.startDate.toDateString()}_` + `${this.interval.endDate.toDateString()}_` + `${""}` + `.xlsx`);
  }
  getCategory(categoryId: string, index: number) {
    const myArray = categoryId.split("_");
    switch (myArray[index]) {
      case '0': return "#FFCA39";
      case '1': return "#F35B5A";
      case '2': return "#379DDA";
      default:
        return "#F35B5A";
    }
  }
}
