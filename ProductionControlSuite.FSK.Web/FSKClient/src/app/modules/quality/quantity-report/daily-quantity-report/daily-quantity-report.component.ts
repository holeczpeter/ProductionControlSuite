import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, forkJoin, Subject, Subscription, takeUntil } from 'rxjs';
import { EnumModel, GetQuantityReportByOperation, IntervalModel, IntervalOption, QuantityOperationReportModel, SelectModel, ShiftModel, Views } from '../../../../models/generated/generated';
import { QuantityTableModel } from '../../../../models/quantity-table-model';
import { DefectDataService } from '../../../../services/data/defect-data.service';
import { QualityDataService } from '../../../../services/data/quality-data.service';
import { ShiftDataService } from '../../../../services/data/shift-data.service';
import { IntervalViewService } from '../../../../services/interval-view/interval-view.service';
import { LanguageService } from '../../../../services/language/language.service';

@Component({
  selector: 'app-daily-quantity-report',
  templateUrl: './daily-quantity-report.component.html',
  styleUrls: ['./daily-quantity-report.component.scss']
})
export class DailyQuantityReportComponent implements OnInit, OnDestroy {

  operation: SelectModel;
  quantityReportModel: QuantityOperationReportModel;
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
  title = "qualityreport.title";
  shifts: ShiftModel[];
  categories: EnumModel[];
  chartTitle: string | null;
  tableModel: QuantityTableModel;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly qualityDataService: QualityDataService,
    private readonly defectDataService: DefectDataService,
    public languageService: LanguageService,
    private readonly shiftDataServie: ShiftDataService,
    private intervalPanelService: IntervalViewService) {
  }

  ngOnInit(): void {
    forkJoin([this.shiftDataServie.getAll(), this.defectDataService.getAllDefectCategories()])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([shifts, categories]) => {
        this.shifts = shifts;
        this.categories = categories;
      });

    this.selectedView = this.intervalOptions.find(x => x.isDefault)!.value;
    if (this.monthDataSubscription) this.monthDataSubscription.unsubscribe();
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();
    this.intervalSubscription = this.intervalPanelService.getCurrentIntervalModel()
      .pipe(takeUntil(this.destroy$), distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
      .subscribe((x: IntervalModel) => {
        this.currentInterval = x;
        this.selectedView = x.selectedView;
        if (this.operation) this.initalize();
      });
    this.intervalPanelService.setViews(this.selectedView, this.currentDate);
  }

  initalize() {
    if (this.currentInterval) {
      let request: GetQuantityReportByOperation = {
        operationId: this.operation.id,
        startDate: this.currentInterval.startDate,
        endDate: this.currentInterval.endDate,
      }
      this.qualityDataService.getQuantityReportByOperation(request).pipe(takeUntil(this.destroy$)).subscribe(reportModel => {
        this.quantityReportModel = reportModel;
        this.tableModel = {
          interval: this.currentInterval,
          model: this.quantityReportModel
        };

        this.chartTitle = this.intervalPanelService.details;
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
