import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { addDays } from 'date-fns';
import format from 'date-fns/fp/format';
import { debounceTime, distinctUntilChanged, ReplaySubject, Subject, Subscription, takeUntil } from 'rxjs';
import { DefectCategories, GetQuantityReport, IntervalModel, IntervalOption, QuantityDefectReportModel, QuantityProductReportModel, QuantityShiftReportModel, SelectModel, ShiftModel, Views } from '../../../models/generated/generated';
import { AccountService } from '../../../services/account.service';
import { ProductDataService } from '../../../services/data/product-data.service';
import { QualityDataService } from '../../../services/data/quality-data.service';
import { ShiftDataService } from '../../../services/data/shift-data.service';
import { IntervalViewService } from '../../../services/interval-view/interval-view.service';
import { LanguageService } from '../../../services/language/language.service';
class QuantityRow {
  [key: string]: any
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
  data: QuantityProductReportModel;
  formGroup: UntypedFormGroup;
  products!: SelectModel[]
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<SelectModel[]> = new ReplaySubject<SelectModel[]>(1);
  @ViewChild('productSelect') productSelect: MatSelect;
  protected _onDestroy = new Subject<void>();
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  columnNames: Array<string> = ['defectCode', 'defectName', 'defectTranslatedName', 'defectCategoryName', 'quantity', 'defectQuantity', 'ppm'];
  pageSize = this.accountService.getPageSize();
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  intervalOptions: Array<IntervalOption> = [
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
  displayedHeaders = {
    days: new Array<TableHeader>(),
    shifts: new Array<TableHeader>(),
    columnIds: new Array<string>(),
    sumIds: new Array<string>(),
    daysQuantity: new Array<string>(),
    shiftsQuantity: new Array<string>(),
  };
  shifts:ShiftModel[];
    dayColumnNames: string[];
    shiftColumnNames: string[];
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
        this.data = x;
        this.createDataSource();
      });
    };
  }

  createDataSource() {
    this.dataSource = new MatTableDataSource();
    let rows = new Array<QuantityRow>();
    this.displayedHeaders = {
      days: new Array<TableHeader>(),
      shifts: new Array<TableHeader>(),
      columnIds: new Array<string>(),
      sumIds: new Array<string>(),
      daysQuantity: new Array<string>(),
      shiftsQuantity: new Array<string>(),
    };
    if (this.data) {
      for (let i = 0; i <= this.currentInterval.differenceInCalendarDays; i++) {
        let currentDate = addDays(this.currentInterval.startDate, i);
        this.displayedHeaders.days.push({ id: currentDate.toString(), value: this.getSumQuantityByDay(currentDate.toString()) });
        
        this.displayedHeaders.daysQuantity.push(currentDate.toString()+"_sum");
        for (var j = 0; j < this.shifts.length; j++) {
          this.displayedHeaders.shifts.push({ id: currentDate.toString() + "_" + this.shifts[j].id, value: this.getSumQuantityByShift(currentDate, this.shifts[j].id) });
          this.displayedHeaders.shiftsQuantity.push(currentDate.toString() + "_" + this.shifts[j].id + "_sum");
        }
      }
      this.dayColumnNames = this.displayedHeaders.days.map(x => x.id);
      this.shiftColumnNames = this.displayedHeaders.shifts.map(x => x.id);
      this.data.operations[0].defects.forEach(defect => {
        const row = new QuantityRow();
        row['defect'] = { id: defect.defectId, name: defect.defectName, translatedName: defect.defectTranslatedName };

        for (let i = 0; i <= this.currentInterval.differenceInCalendarDays; i++) {
          let currentDate = addDays(this.currentInterval.startDate, i);
          let currentDateObject = defect.days.find(day => format('yyyy-MM-dd', new Date(day.date)).trim() == format('yyyy-MM-dd', currentDate).trim());
          for (var j = 0; j < this.shifts.length; j++) {
            let currentShiftObject = currentDateObject ? currentDateObject.shifts.find(s => s.shiftId == this.shifts[j].id) : null;
            this.categories.forEach(c => {
              let currentValue = defect.defectCategory === c && currentShiftObject ? currentShiftObject?.defectQuantity : '';
              row[currentDate.toString() + "_" + this.shifts[j].id + "_" + c] =
                { date: currentDate, shift: this.shifts[j].id, category: c, value: currentValue };
            });
          }
        }
        let allShift = this.getAllShifts(defect);
        this.categories.forEach(c => {
          let currentValue = defect.defectCategory === c  ? allShift.map(x => x.defectQuantity).reduce((a, b) => a + b, 0) : 0;
          row[c + "_" + 'sum'] = currentValue;
        });
        rows.push(row);
      })
    }
    this.displayedHeaders.columnIds = [...Object.keys(rows[0]).filter(x => !x.includes('sum'))];
    this.displayedHeaders.sumIds = [...Object.keys(rows[0]).filter(x => x.includes('sum'))];
    this.dataSource = new MatTableDataSource(rows);
    this.dataSource.paginator = this.paginator;
  }
  getAllShifts(cell: QuantityDefectReportModel): Array<QuantityShiftReportModel> {
    return cell.days
      .flatMap(x => { return x.shifts });
  }
  getSumQuantity() {
    let current = this.data.operations[0].defects.flatMap(x => { return x.days }).flatMap(day => { return day.shifts } );
    if (current) return current.map(x => x.defectQuantity).reduce((a, b) => a + b, 0);
    else return 0;
  }
  getSumQuantityByDay(item: string) {
    let current = this.data.operations[0].defects.flatMap(x => { return x.days }).find(day => format('yyyy-MM-dd', new Date(day.date)).trim() == format('yyyy-MM-dd', new Date(item)).trim());
    if (current) return current.quantity;
    else return 0;
  }
  getSumQuantityByShift(date: Date,shiftId:number) {
    
    let current = this.data.operations[0].defects.flatMap(x => { return x.days }).find(day => format('yyyy-MM-dd', new Date(day.date)).trim() == format('yyyy-MM-dd', new Date(date)).trim());
    if (current) {
      let currentShift = current.shifts.find(s => s.id == shiftId);
      if (currentShift) return currentShift.quantity;
      else return 0;
    }
    else return 0;
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
  getColSpan() {
   return  this.shifts.length * 3;
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

