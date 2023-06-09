import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { getWeek } from 'date-fns';
import eachWeekOfInterval from 'date-fns/eachWeekOfInterval';
import { Subject, takeUntil } from 'rxjs';
import { EnumModel, GroupReportModel, IntervalModel, OperationItem, QuantityOperationReportModel, Views } from '../../../../../models/generated/generated';
import { TableColumn } from '../../../../../models/table-column';
import { TableColumnModel } from '../../../../../models/table-column-model';
import { TableHeader } from '../../../../../models/table-header';
import { DefectDataService } from '../../../../../services/data/defect-data.service';
import { IntervalViewService } from '../../../../../services/interval-view/interval-view.service';
import { LanguageService } from '../../../../../services/language/language.service';
import { TableExportService } from '../../../../../services/table/table-export.service';
import { QualityGroupReportChartDialogComponent } from '../quality-group-report-chart-dialog/quality-group-report-chart-dialog.component';
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

export class QualityGroupReportWeeklyTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() result: GroupReportModel;
  @Input() interval: IntervalModel;
  title = "defectGroup.title";
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
  footerTotalColumns: Array<string>;
  footerGoalColumns: Array<string>;
  chartTitle: string | null;
  summaryChartTitle: string | null;
  public get views(): typeof Views {
    return Views;
  }
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly dialog: MatDialog,
    private intervalPanelService: IntervalViewService,
    private readonly defectDataService: DefectDataService,
    public languageService: LanguageService,
    private readonly tableExportService: TableExportService) {
  }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["result"] || changes["interval"]) {
     
      if (!this.categories) {
        this.defectDataService.getAllDefectCategories().pipe(takeUntil(this.destroy$)).subscribe(res => {
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
              operationCategorySumHeaders.push({ id: operation.operationId + "_" + week.toString() + "_" + c.id + "_sum", value: flattened })
              operationCategorySumColumns.push(operation.operationId + "_" + week.toString() + "_" + c.id + "_sum");
            }
          });
        })
       
        this.categories.forEach((c, catIndex) => {
          if (!operationCategorySumColumns.includes(c.id + "_sumq")) {
            const flattened = operation.defects.flatMap(num => num.periodItems).filter(x => x.defectCategory == c.id).map(x => x.defectQuantity).reduce((a, b) => a + b, 0);
            operationCategorySumHeaders.push({ id: operation.operationId + "_" + c.id + "_sumq", value: flattened });
            operationCategorySumColumns.push(operation.operationId + "_" + c.id + "_sumq");
          }
        });
        this.categories.forEach((c, catIndex) => {
          if (!operationCategorySumColumns.includes(c.id + "_sumpp")) {
            const arr = operation.defects.flatMap(num => num.periodItems).filter(x => x.defectCategory == c.id);
            const flattened = arr.map(x => x.ppm).reduce((a, b) => a + b, 0);
            operationCategorySumHeaders.push({ id: operation.operationId + "_" + c.id + "_sumpp", value: flattened });
            operationCategorySumColumns.push(operation.operationId + "_" + c.id + "_sumpp");
          }
        });

        //Defects sorok
        operation.defects.forEach(defect => {
          const row = new TableColumn();
          row['order'] = defect.order;
          row['defect'] = { id: defect.defectId, code: defect.defectCode, name: defect.defectName, translatedName: defect.defectTranslatedName };
          this.periods.forEach(week => {
            let currentValues = defect.periodItems.filter(x => x.periodNumber == week);
            this.categories.forEach((c, catIndex) => {
              let currentModel = currentValues.find(x => x.defectCategory == c.id);
              row[week.toString() + "_" + c.id] = { week: week, category: c, value: currentModel ? currentModel?.defectQuantity : '' };
            });
          })
          
          this.categories.forEach(c => {
            row['sum_q_' + c.id] = defect.defectCategory == c.id ? defect.defectQuantity : 0;
            row['sum_ppm_' + c.id] = defect.defectCategory == c.id ? defect.ppm : 0;
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
      this.chartTitle = this.intervalPanelService.details;
      this.summaryChartTitle = this.chartTitle + " - " + this.result.name;
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
    this.footerTotalColumns = [...[]];
    this.footerGoalColumns = [...[]];
  }

  createHeaders() {
    this.columnsToDisplay.push("order");
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
      this.footerTotalColumns.push('total_' + x.id);
      this.footerGoalColumns.push('goal_' + x.id);
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
    return this.result.ppmGoal;
  }
  getTotal(category: number) {
    return this.result.items.flatMap(x => x.defects.filter(x => x.defectCategory == category).map(i => i.ppm)).reduce((a, b) => a + b, 0);
    
  }
  getFooterColSpan() {
    return (this.periods.length * 3) + 3;
  }
  trackByFn(index: number, item: any) {
    return index;
  }
  onOpenChart(operationItem: OperationItem) {
    let chartDialogModel = {
      operationItem: operationItem,
      chartTitle: this.chartTitle
    }
    let dialogRef = this.dialog.open(QualityGroupReportChartDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: chartDialogModel,
      minWidth: '900px'
    });
    dialogRef.afterClosed().subscribe();
  }
  onExport() {
    let name = `${this.interval.startDate.toDateString()}_` + `${this.interval.endDate.toDateString()}_` + `${this.result.name}` + `.xls`;
    var tbls = document.getElementsByTagName("table");
    this.tableExportService.exportFromInnerHTML(tbls, name);
  }
  
  getCategory(categoryId: string, index: number) {
    const myArray = categoryId.split("_");
    switch (myArray[index]) {
      case '0': return "#FFCA39";
      case '1': return "#379DDA";
      case '2': return "#F35B5A";
      default:
        return "#F35B5A";
    }
  }
  getCategoryById(categoryId: number) {
    switch (categoryId) {
      case 0: return "#FFCA39";
      case 1: return "#379DDA";
      case 2: return "#F35B5A";
      default:
        return "#F35B5A";
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
