import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, forkJoin, Subscription } from 'rxjs';
import { CrapCostTableModel } from '../../../../models/crap-cost-table-model';
import { CrapCostProductModel, EnumModel, GetCrapCostByOperation, IntervalModel, IntervalOption, SelectModel, ShiftModel, Views } from '../../../../models/generated/generated';
import { DefectDataService } from '../../../../services/data/defect-data.service';
import { QualityDataService } from '../../../../services/data/quality-data.service';
import { ShiftDataService } from '../../../../services/data/shift-data.service';
import { IntervalViewService } from '../../../../services/interval-view/interval-view.service';
import { LanguageService } from '../../../../services/language/language.service';

@Component({
  selector: 'app-operation-crap-cost',
  templateUrl: './operation-crap-cost.component.html',
  styleUrls: ['./operation-crap-cost.component.scss']
})
export class OperationCrapCostComponent implements OnInit, OnDestroy {

  operation: SelectModel;
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
        if (this.operation) this.initalize();
      });
    this.intervalPanelService.setViews(this.selectedView, this.currentDate);
  }

  initalize() {
    if (this.currentInterval) {
      let request: GetCrapCostByOperation = {
        operationId: this.operation.id,
        startDate: this.currentInterval.startDate,
        endDate: this.currentInterval.endDate,
      }
      this.qualityDataService.getCrapCostByOperation(request).subscribe(reportModel => {
        this.crapCostModel = reportModel;
        this.crapCostTableModel = { model: this.crapCostModel, interval: this.currentInterval }
      });
    };
  }

  onSelectedOperation(event: SelectModel) {
    this.operation = event;
    this.initalize();
  }

  ngOnDestroy() {
    if (this.monthDataSubscription) this.monthDataSubscription.unsubscribe();
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();
  }

}

