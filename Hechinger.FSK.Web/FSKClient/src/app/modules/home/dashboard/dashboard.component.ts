import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged, forkJoin, Subscription } from 'rxjs';
import { GetDashboardCrapCost, GetProductionInformation, GetWorkshopPPmData, IntervalModel, IntervalOption, Views, WorkshopPpmData } from '../../../models/generated/generated';
import { WorkshopCrapCostModel } from '../../../models/workshop-crap-cost-model';
import { WorkshopPpmModel } from '../../../models/workshop-ppm-model';
import { WorkshopProductionInfo } from '../../../models/workshop-production-info';
import { ChartService } from '../../../services/chart/chart.service';
import { DashboardDataService } from '../../../services/data/dashboard-data.service';
import { IntervalViewService } from '../../../services/interval-view/interval-view.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  title = "welcome";
  workshopPpmModel: WorkshopPpmModel;
  workshopCrapCostModel: WorkshopCrapCostModel;
  workshopProductionInfo = new Array<WorkshopProductionInfo>();
  currentInterval: IntervalModel;
  intervalOptions: Array<IntervalOption> = [
    { name: 'week', value: Views.Week, isDefault: true },
  ];
  currentDate = new Date();
  selectedView: Views;
  intervalSubscription: Subscription;
  langChangeSubscription: Subscription;
  subtitle: string | null;
  constructor(private dashBoardDataService: DashboardDataService,
    public translateService: TranslateService,
    private chartService: ChartService,
    private readonly intervalPanelService: IntervalViewService) {
    if (this.langChangeSubscription) this.langChangeSubscription.unsubscribe();
    this.translateService.onLangChange.subscribe(lang => {
      this.subtitle = this.chartService.getChartInterval(this.currentInterval);
    });
    this.selectedView = this.intervalOptions.find(x => x.isDefault)!.value;
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();
    this.intervalSubscription = this.intervalPanelService.getCurrentIntervalModel()
      .pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
      .subscribe((x: IntervalModel) => {
        this.currentInterval = x;
        this.selectedView = x.selectedView;
        this.createChart();
        this.subtitle = this.chartService.getChartInterval(this.currentInterval);
      });
    this.intervalPanelService.setViews(this.selectedView, new Date(2022,2,1));

  }
  createChart() {
    let getWorkshopPPmData: GetWorkshopPPmData = {
      startDate: this.currentInterval.startDate,
      endDate: this.currentInterval.endDate,
    };
    let getDashboardCrapCost: GetDashboardCrapCost = {
      startDate: this.currentInterval.startDate,
      endDate: this.currentInterval.endDate,
    };
    let getProductionInfo: GetProductionInformation = {
      startDate: this.currentInterval.startDate,
      endDate: this.currentInterval.endDate,
    };
    
    forkJoin([this.dashBoardDataService.getWorkshopPpmData(getWorkshopPPmData),
      this.dashBoardDataService.getDashboardCrapCost(getDashboardCrapCost),
      this.dashBoardDataService.getProductionInfo(getDashboardCrapCost)])
      .subscribe(([ppm, crapcost, products]) => {
        this.workshopPpmModel = { items: ppm, interval: this.currentInterval }
        this.workshopCrapCostModel = { items: crapcost, interval: this.currentInterval }
        products.forEach(x => {
          this.workshopProductionInfo.push({ item: x, interval: this.currentInterval })
        });
        
    });
  }
  ngOnInit(): void {
   
  }
  ngOnDestroy() {
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();
  }
}
