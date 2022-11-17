import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, ReplaySubject, Subject, Subscription, takeUntil } from 'rxjs';
import { GetMonthlyQualityHistory, IntervalModel, IntervalOption, MonthlyQualityModel, SelectModel, Views } from '../../../models/generated/generated';
import { ProductDataService } from '../../../services/data/product-data.service';
import { QualityDataService } from '../../../services/data/quality-data.service';
import { IntervalViewService } from '../../../services/interval-view/interval-view.service';
import { LanguageService } from '../../../services/language/language.service';

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
  results: Array<MonthlyQualityModel>;
  intervalOptions: Array<IntervalOption> = [
    { name: 'year', value: Views.Year, isDefault: true },
  ];
  currentDate = new Date();
  selectedView: Views;
  currentInterval: IntervalModel;
  intervalSubscription: Subscription;
  formGroup: UntypedFormGroup;
  products!: SelectModel[];
  public filterCtrl: FormControl = new FormControl();
  public filtered: ReplaySubject<SelectModel[]> = new ReplaySubject<SelectModel[]>(1);
  protected _onDestroy = new Subject<void>();
  title = "qualityhistorymonthly.title";

  constructor(private readonly qualityDataService: QualityDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private intervalPanelService: IntervalViewService,
    private productDataService: ProductDataService,
    public languageService: LanguageService) {
  }

  ngOnInit(): void {

    this.selectedView = this.intervalOptions.find(x => x.isDefault)!.value;
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
        productId: this.formGroup.get('product')?.value.id,
        year: this.currentInterval.currentYear
      }
      this.qualityDataService.getMonthlyQualityHistory(request).subscribe(results => {
        this.results = results;
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
    this.productDataService.getByFilter(search).subscribe((result: any) => {
      this.products = result;
      this.filtered.next(this.products.slice());
    });
  }
  
 
  ngOnDestroy() {
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();
   
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}




