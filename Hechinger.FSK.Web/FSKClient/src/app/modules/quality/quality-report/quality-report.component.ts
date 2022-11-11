import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, ReplaySubject, Subject, Subscription, takeUntil } from 'rxjs';
import { GetQuantityReportByProduct, IntervalModel, IntervalOption, QuantityOperationReportModel, SelectModel, Views } from '../../../models/generated/generated';
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
  data: Array<QuantityOperationReportModel>;
  product!: SelectModel;
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
    public languageService: LanguageService,
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
        if (this.product && this.currentInterval ) this.initalize();
      });
    this.intervalPanelService.setViews(this.selectedView, this.currentDate);
    
  }
 
  initalize() {
    if (this.currentInterval && this.product) {
      let request: GetQuantityReportByProduct = {
        productId: this.product.id,
        startDate: this.currentInterval.startDate,
        endDate: this.currentInterval.endDate,
      }
      this.qualityDataService.getQuantityReportByProduct(request).subscribe(x => {
        this.data = x;
        this.createDataSource();
      });
    };
  }
  createDataSource() {
    if (this.data) {
    }
  }
  onSelectedProduct(event: SelectModel) {
    this.product = event;
    this.initalize();
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
