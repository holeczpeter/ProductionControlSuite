import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, ReplaySubject, Subject, Subscription, takeUntil } from 'rxjs';
import { GetQuantityReport, IntervalModel, IntervalOption, QuantityProductReportModel, SelectModel, Views } from '../../../models/generated/generated';
import { AccountService } from '../../../services/account.service';
import { ProductDataService } from '../../../services/data/product-data.service';
import { QualityDataService } from '../../../services/data/quality-data.service';
import { IntervalViewService } from '../../../services/interval-view/interval-view.service';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'app-quality-report',
  templateUrl: './quality-report.component.html',
  styleUrls: ['./quality-report.component.scss']
})
export class QualityReportComponent implements OnInit, OnDestroy  {
  data: QuantityProductReportModel;
  formGroup: UntypedFormGroup;
  products!: SelectModel[]
  public productFilterCtrl: FormControl = new FormControl();
  public filteredProducts: ReplaySubject<SelectModel[]> = new ReplaySubject<SelectModel[]>(1);
  @ViewChild('productSelect') productSelect: MatSelect;
  protected _onDestroy = new Subject<void>();
  dataSource: MatTableDataSource<any>;
  columnNames: Array<string> = ['defectCode', 'defectName', 'defectTranslatedName', 'defectCategoryName', 'quantity', 'defectQuantity', 'ppm'];

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
  constructor(private readonly qualityDataService: QualityDataService,
    private readonly productDataService: ProductDataService,
    public languageService: LanguageService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly accountService: AccountService,
    private intervalPanelService: IntervalViewService) {
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
    if (this.data) {
    }
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
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
