import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, forkJoin, Subscription } from 'rxjs';
import { CrapCostTableModel } from '../../../../models/crap-cost-table-model';
import { CrapCostProductModel, EnumModel, GetCrapCostByProduct, IntervalModel, IntervalOption, SelectModel, ShiftModel, Views } from '../../../../models/generated/generated';
import { DefectDataService } from '../../../../services/data/defect-data.service';
import { QualityDataService } from '../../../../services/data/quality-data.service';
import { ShiftDataService } from '../../../../services/data/shift-data.service';
import { IntervalViewService } from '../../../../services/interval-view/interval-view.service';
import { LanguageService } from '../../../../services/language/language.service';

@Component({
  selector: 'app-product-crap-cost',
  templateUrl: './product-crap-cost.component.html',
  styleUrls: ['./product-crap-cost.component.scss']
})
export class ProductCrapCostComponent implements OnInit, OnDestroy {

  product: SelectModel;
  crapCostModel: CrapCostProductModel;
  intervalOptions: Array<IntervalOption> = [
    { name: 'day', value: Views.Day, isDefault: true },
    { name: 'week', value: Views.Week, isDefault: false },
    { name: 'month', value: Views.Month, isDefault: false },
  ];
  currentDate = new Date();
  selectedView: Views;
  currentInterval: IntervalModel;
  intervalSubscription: Subscription;
  monthDataSubscription: Subscription;
  title = "crapcost";
  shifts: ShiftModel[];
  categories: EnumModel[];
  chartTitle: string | null;
  crapCostTableModel: CrapCostTableModel;
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
    if (this.currentInterval) {
      let request: GetCrapCostByProduct = {
        productId: this.product.id,
        startDate: this.currentInterval.startDate,
        endDate: this.currentInterval.endDate,
      }
      this.qualityDataService.getCrapCostByProduct(request).subscribe(reportModel => {
        this.crapCostModel = reportModel;
        this.crapCostTableModel = { model: this.crapCostModel, interval: this.currentInterval }
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


