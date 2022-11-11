import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { distinctUntilChanged, forkJoin, Subscription } from 'rxjs';
import { DefectDataService } from '../../../../services/data/defect-data.service';
import { QualityDataService } from '../../../../services/data/quality-data.service';
import { ShiftDataService } from '../../../../services/data/shift-data.service';
import { IntervalViewService } from '../../../../services/interval-view/interval-view.service';
import { LanguageService } from '../../../../services/language/language.service';
import { EnumModel, GetQuantityReportByProduct, IntervalModel, IntervalOption, QuantityOperationReportModel, SelectModel, ShiftModel, Views } from '../../../../models/generated/generated';

@Component({
  selector: 'app-summary-quantity-report',
  templateUrl: './summary-quantity-report.component.html',
  styleUrls: ['./summary-quantity-report.component.scss']
})
export class SummaryQuantityReportComponent implements OnInit, OnDestroy {
  quantityReportModels: Array<QuantityOperationReportModel>;
  product: SelectModel;
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
  shifts: ShiftModel[];
  categories: EnumModel[];

  constructor(private readonly qualityDataService: QualityDataService,
    private readonly defectDataService: DefectDataService,
    public languageService: LanguageService,
    private readonly shiftDataServie: ShiftDataService,
    private intervalPanelService: IntervalViewService) {
  }

  ngOnInit(): void {
    forkJoin([this.shiftDataServie.getAll(), this.defectDataService.getAllDefectCategories()]).subscribe(([shifts, categories]) => {
      this.shifts = shifts;
      this.categories = categories;
    });

    this.selectedView = this.intervalOptions.find(x => x.isDefault)!.value;
    if (this.monthDataSubscription) this.monthDataSubscription.unsubscribe();
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();
    this.intervalSubscription = this.intervalPanelService.getCurrentIntervalModel()
      .pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
      .subscribe((x: IntervalModel) => {
        this.currentInterval = x;
        this.selectedView = x.selectedView;
        if (this.product) this.initalize();
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
      this.qualityDataService.getQuantityReportByProduct(request).subscribe(reportModel => {
        this.quantityReportModels = reportModel;
      });
    };
  }

  onSelectedProduct(event: SelectModel) {
    this.product = event;
    this.initalize();
  }
  ngOnDestroy() {
    if (this.monthDataSubscription) this.monthDataSubscription.unsubscribe();
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();

  }
}

