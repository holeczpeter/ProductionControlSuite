import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { addDays } from 'date-fns';
import format from 'date-fns/fp/format';
import { debounceTime, distinctUntilChanged, ReplaySubject, Subject, Subscription, takeUntil } from 'rxjs';
import { DefectCategories, GetQuantityReport, IntervalModel, IntervalOption, OperationModel, QuantityDefectReportModel, QuantityOperationReportModel, SelectModel, ShiftModel, Views } from '../../../models/generated/generated';
import { AccountService } from '../../../services/account.service';
import { ProductDataService } from '../../../services/data/product-data.service';
import { QualityDataService } from '../../../services/data/quality-data.service';
import { ShiftDataService } from '../../../services/data/shift-data.service';
import { IntervalViewService } from '../../../services/interval-view/interval-view.service';
import { LanguageService } from '../../../services/language/language.service';

class TableColumn {
  [key: string]: any
}
class OperationGroupRow {
  element: any;
  isOperation: boolean;
}

class TableHeader {
  id: string;
  value: any;
}

@Component({
  selector: 'app-quantity-report',
  templateUrl: './quantity-report.component.html',
  styleUrls: ['./quantity-report.component.scss']
})
export class QuantityReportComponent implements OnInit, OnDestroy {
  data: Array<QuantityOperationReportModel>;
  formGroup: UntypedFormGroup;
  products!: SelectModel[]
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<SelectModel[]> = new ReplaySubject<SelectModel[]>(1);
  @ViewChild('productSelect') productSelect: MatSelect;
  protected _onDestroy = new Subject<void>();
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  
  intervalOptions: Array<IntervalOption> = [
    { name: 'day', value: Views.Day, isDefault: false },
    { name: 'week', value: Views.Week, isDefault: true },
    { name: 'month', value: Views.Month, isDefault: false },
    { name: 'year', value: Views.Year, isDefault: false },
  ];
  currentDate = new Date();
  selectedView: Views;
  currentInterval: IntervalModel;
  intervalSubscription: Subscription;
  monthDataSubscription: Subscription;
  title = "qualityreport.title";
  categories = Object.values(DefectCategories).filter((v) => !isNaN(Number(v)));
  shifts: ShiftModel[];
  columnsToDisplay: string[];
  displayedColumns: string[];
  dayHeaders: TableHeader[];
  shiftHeaders: TableHeader[];
  shiftQuantityHeaders: TableHeader[];
  dayColumns: string[];
  shiftColumns: string[];
    shiftQuantityColumns: string[];
  constructor(private readonly qualityDataService: QualityDataService,
    private readonly productDataService: ProductDataService,
    public languageService: LanguageService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly accountService: AccountService,
    private readonly shiftDataServie: ShiftDataService,
    private intervalPanelService: IntervalViewService) {
  }

  ngOnInit(): void {
    this.shiftDataServie.getAll().subscribe(shifts => {
      this.shifts = shifts;
    });
    this.selectedView = this.intervalOptions.find(x => x.isDefault)!.value;
    if (this.monthDataSubscription) this.monthDataSubscription.unsubscribe();
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();
    this.intervalSubscription = this.intervalPanelService.getCurrentIntervalModel()
      .pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
      .subscribe((x: IntervalModel) => {
        this.currentInterval = x;
        this.selectedView = x.selectedView;
        if (this.formGroup && this.formGroup.get('product')?.value) this.initalize();
      });
    this.intervalPanelService.setViews(this.selectedView, this.currentDate);
    this.productDataService.getByFilter('').subscribe(products => {
      this.products = products;
      this.formGroup = this.formBuilder.group({
        product: [null],
      });
      this.productFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).pipe(
        debounceTime(500)).subscribe(filter => {
          this.filterProduct();
        })
      this.filteredProducts.next(this.products.slice());
      this.valueChanges();
    });
  }
  valueChanges() {
    this.formGroup.get('product')?.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(x => {
      this.initalize();
    });
  }
  initalize() {
    if (this.currentInterval && this.formGroup && this.formGroup.get('product')?.value) {
      let request: GetQuantityReport = {
        productId: this.formGroup.get('product')?.value.id,
        startDate: this.currentInterval.startDate,
        endDate: this.currentInterval.endDate,
      }
      this.qualityDataService.getQuantityReport(request).subscribe(x => {
        console.log(x)
        this.data = x;
        this.createDataSource();
      });
    };
  }

  createDataSource() {
    this.dataSource = new MatTableDataSource();
    let rows = new Array<TableColumn>();
    this.columnsToDisplay = new Array<string>();
    this.displayedColumns = new Array<string>();
    this.dayHeaders = new Array<TableHeader>();
    this.shiftHeaders = new Array<TableHeader>();
    this.shiftQuantityHeaders = new Array<TableHeader>();
    this.dayColumns = new Array<string>();
    this.shiftColumns = new Array<string>();
    if (this.data) {

      console.log(this.data)
      this.data.forEach((operation, opIndex) => {
        let shiftSumRow = new TableColumn();
        shiftSumRow['defect'] = { id:  operation.operationId, code: operation.operationCode, name: operation.operationName, translatedName: operation.operationTranslatedName };

        const operationRow = new OperationGroupRow();
        operationRow.element = { id: operation.operationId, code: operation.operationCode, name: operation.operationName, translatedName: operation.operationTranslatedName };
        operationRow.isOperation = true;
        rows.push(operationRow);
        operation.defects.forEach((defect, index) => {

          const row = new TableColumn();
         
          row['defect'] = { id: defect.defectId, code: operation.operationCode, name: defect.defectName, translatedName: defect.defectTranslatedName };
         
          for (let i = 0; i <= this.currentInterval.differenceInCalendarDays; i++) {

            let currentDate = addDays(this.currentInterval.startDate, i);
            let currentDateObjects = defect.days.filter(day => format('yyyy-MM-dd', new Date(day.date)).trim() == format('yyyy-MM-dd', currentDate).trim());
            if (opIndex == 0 && index == 0) this.dayHeaders.push({ id: currentDate.toString(), value: currentDate });

            for (var j = 0; j < this.shifts.length; j++) {

              
              if (opIndex == 0 && index == 0) {
                this.shiftHeaders.push({ id: currentDate.toString() + "_" + this.shifts[j].id, value: { id: this.shifts[j].id, name: this.shifts[j].name, translatedName: this.shifts[j].translatedName } });
              
                let shiftQuantity = operation.days
                  .find(day => format('yyyy-MM-dd', new Date(day.date)).trim() == format('yyyy-MM-dd', currentDate).trim() && day.shiftId == this.shifts[j].id)?.quantity;
                  //.map(x => x.quantity);
                  //.reduce((a, b) => a + b, 0);
                this.shiftQuantityHeaders.push({ id: "q_" + currentDate.toString() + "_" + this.shifts[j].id, value: shiftQuantity });
              } 
              
              this.categories.forEach((c, catIndex) => {

                let currentDefectQuantity = currentDateObjects.find(x => x.shiftId == this.shifts[j].id);
                let defectQuantity = c == defect.defectCategory &&  currentDefectQuantity ?currentDefectQuantity.defectQuantity: '';
                row[currentDate.toString() + "_" + this.shifts[j].id + "_" + c] = { date: currentDate, shift: this.shifts[j].id, category: c, value: defectQuantity };

              });
            }
          }
         
          rows.push(row);
        });
      });
     
    }
    this.shiftQuantityColumns = [...this.shiftQuantityHeaders.map(x => x.id)];
    this.dayColumns = [...this.dayHeaders.map(x => x.id)];
    this.shiftColumns = [...this.shiftHeaders.map(x => x.id)];
    this.displayedColumns = [...Object.keys(rows[2])];
    this.columnsToDisplay = [...Object.keys(rows[2])];
    this.dataSource = new MatTableDataSource(rows);
   
  }
 
  filterProduct(): void {
    if (!this.products) return;
    let search = this.productFilterCtrl.value;
    if (!search) {
      this.filteredProducts.next(this.products.slice());
      return;
    }
    else search = search.toLowerCase();
    this.productDataService.getByFilter(search).subscribe((result: any) => {
      this.products = result;
      this.filteredProducts.next(this.products.slice());
    });
  }
  getShiftName(header:string) {
    const myArray = header.split("_");
    return this.shifts.find(x => x.id.toString() == myArray[1])?.name;
  }
  getColSpanAfterOperation() {
    return ((this.currentInterval.differenceInCalendarDays +1) * this.shifts.length * 3) + 3;
  }
  getColSpanShift() {
    return this.shifts.length;
  }
  getColSpanDay() {
   return  this.shifts.length * 3;
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
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}

