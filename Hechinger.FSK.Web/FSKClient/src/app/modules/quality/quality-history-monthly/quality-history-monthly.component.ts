import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, ReplaySubject, Subject, Subscription, takeUntil } from 'rxjs';
import { DefectCategories, GetMonthlyQualityHistory, IntervalModel, IntervalOption, MonthlyQualityModel, SelectModel, Views } from '../../../models/generated/generated';
import { ProductDataService } from '../../../services/data/product-data.service';
import { QualityDataService } from '../../../services/data/quality-data.service';
import { DateService } from '../../../services/date.service';
import { IntervalViewService } from '../../../services/interval-view/interval-view.service';
import { LanguageService } from '../../../services/language/language.service';
import { ResultBuilder } from '../../../services/result/result-builder';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

export class QualityMonthlyTable {
  month: string;
  f0: number;
  f1: number;
  f2: number;
}

@Component({
  selector: 'app-quality-history-monthly',
  templateUrl: './quality-history-monthly.component.html',
  styleUrls: ['./quality-history-monthly.component.scss']
})
export class QualityHistoryMonthlyComponent implements  OnInit, OnDestroy {
  categories = DefectCategories;
  dataSource: MatTableDataSource<QualityMonthlyTable> = new MatTableDataSource([]);
  columnNames: Array<string> = ['month', 'f0', 'f1', 'f2'];
  results: Array<MonthlyQualityModel>;
  intervalOptions: Array<IntervalOption> = [
    { name: 'year', value: Views.Year, isDefault: true },
  ];
  currentDate = new Date();
  selectedView: Views;
  currentInterval: IntervalModel;
  intervalSubscription: Subscription;
  monthDataSubscription: Subscription;
  formGroup: UntypedFormGroup;
  products!: SelectModel[];
  public filterCtrl: FormControl = new FormControl();
  public filtered: ReplaySubject<SelectModel[]> = new ReplaySubject<SelectModel[]>(1);
  protected _onDestroy = new Subject<void>();
  title = "qualityhistorymonthly.title";
  constructor(private readonly qualityDataService: QualityDataService,
    private dateService: DateService,
    private readonly formBuilder: UntypedFormBuilder,
    private intervalPanelService: IntervalViewService,
    private productDataService: ProductDataService,
    private readonly snackbarService: SnackbarService,
    public languageService: LanguageService) {
  }

  ngOnInit(): void {

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
    this.productDataService.getSelectModel('').subscribe(products => {
      this.products = products;
      this.formGroup = this.formBuilder.group({
        product: [null],
      });
      this.filterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).pipe(
        debounceTime(500)).subscribe(filter => {
          this.filter();
        })
      this.filtered.next(this.products.slice());
      this.formGroup.get('product')?.valueChanges.subscribe(x => {
        this.initalize();
      });
    });
  }
  initalize(): void {
    if (this.currentInterval && this.formGroup && this.formGroup.get('product')?.value) {
      let request: GetMonthlyQualityHistory = {
        productId: this.formGroup.get('product')?.value.id, //1177,
        year: this.currentInterval.currentYear
      }
      this.qualityDataService.getMonthlyQualityHistory(request).subscribe(results => {
        this.results = results;
        this.createDataSource();

      });
    };
  }
  filter(): void {
    if (!this.products) return;
    let search = this.filterCtrl.value;
    if (!search) {
      this.filtered.next(this.products.slice());
      return;
    }
    else search = search.toLowerCase();
    this.productDataService.getSelectModel(search).subscribe((result: any) => {
      this.products = result;
      this.filtered.next(this.products.slice());
    });
  }
  createDataSource() {

    this.monthDataSubscription = this.dateService.getMonthExtension().subscribe(monthExtensions => {
      this.dataSource = new MatTableDataSource<QualityMonthlyTable>();
      let rows = new Array<QualityMonthlyTable>();
      monthExtensions.forEach(month => {
        let row = new QualityMonthlyTable();
        row.month = month.name;
        this.results.forEach(res => {
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
    if (this.results) {
      let categoryObject = this.results.find(x => x.category == category);
      if (categoryObject) {
        return categoryObject.items.map(x => x.value).reduce((a, b) => a + b, 0) / categoryObject.items.length;
      }
      else return 0;
    }
    else return 0;

  }
  onImport() {
    this.qualityDataService.import().subscribe(x => {
      this.snackbarService.open(new ResultBuilder().setMessage('Kész').setSuccess(x).build())
    });
  }
  ngOnDestroy() {
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();
    if (this.monthDataSubscription) this.monthDataSubscription.unsubscribe();
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}




