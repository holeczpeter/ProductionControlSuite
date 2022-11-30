import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged, forkJoin, Subscription } from 'rxjs';
import { DashboardCrapCostChartModel, DashboardPpmChartModel, DashboardWorkshopCrapCost, GetDashboardWorkshopCrapCost, GetDashboardWorkshopPpm, GetPpmWarnings, GetWorkshopProduction, IntervalModel, IntervalOption, PpmWarning, SummaryModel, Views, WorkshopProduction, WorkshopProductionChartModel, WorkshopUserInfo } from '../../../models/generated/generated';
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
  dashboardPpmChartModel: DashboardPpmChartModel;
  dashboardCrapCostChartModel: DashboardCrapCostChartModel;
  dashboardProductionInfoChartModels = new Array<WorkshopProductionChartModel>();
  workshopProduction: WorkshopProduction[];
  currentInterval: IntervalModel;
  intervalOptions: Array<IntervalOption> = [
    { name: 'week', value: Views.Week, isDefault: true },
  ];
  currentDate = new Date();
  selectedView: Views;
  intervalSubscription: Subscription;
  langChangeSubscription: Subscription;
  subtitle: string | null;
  workshopUserStats: WorkshopUserInfo[];
  ppmSummary: SummaryModel;
  crapCostSummary: SummaryModel;
  quanitySummary: SummaryModel;
  defectQuantitySummary: SummaryModel;
  ppmWarningList: PpmWarning[];
  constructor(private dashBoardDataService: DashboardDataService,
    public translateService: TranslateService,
    private chartService: ChartService,
    private readonly intervalPanelService: IntervalViewService) {
    if (this.langChangeSubscription) this.langChangeSubscription.unsubscribe();
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(lang => {
      this.subtitle = this.chartService.getChartInterval(this.currentInterval);
      this.ppmSummary = this.getSummaryPPM();
      this.crapCostSummary = this.getSummaryCrapCost();
      this.quanitySummary = this.getSummaryQuantity();
      this.defectQuantitySummary = this.getSummaryDefectQuantity();
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
    this.intervalPanelService.setViews(this.selectedView, new Date());

  }
  createChart() {
    let getWorkshopPPmData: GetDashboardWorkshopPpm = {
      startDate: this.currentInterval.startDate,
      endDate: this.currentInterval.endDate,
    };
    let getDashboardCrapCost: GetDashboardWorkshopCrapCost = {
      startDate: this.currentInterval.startDate,
      endDate: this.currentInterval.endDate,
    };
    let getProductionInfo: GetWorkshopProduction = {
      startDate: this.currentInterval.startDate,
      endDate: this.currentInterval.endDate,
    };
    let getPpmWarnings: GetPpmWarnings = {
      startDate: this.currentInterval.startDate,
      endDate: this.currentInterval.endDate,
    };

    forkJoin([this.dashBoardDataService.getDashboardPpm(getWorkshopPPmData),
    this.dashBoardDataService.getDashboardCrapCost(getDashboardCrapCost),
    this.dashBoardDataService.getProductionInfo(getProductionInfo),
      this.dashBoardDataService.getWorkshopUserStats({}),
      this.dashBoardDataService.getPpmWarnings(getPpmWarnings)])
      .subscribe(([ppmList, crapcostList, products, usersStats,ppmWarningList]) => {

        this.dashboardPpmChartModel = { items: ppmList, interval: this.currentInterval }
        this.dashboardCrapCostChartModel = { items: crapcostList, interval: this.currentInterval };
        this.workshopProduction = products;
        products.forEach(x => {
          this.dashboardProductionInfoChartModels.push({ item: x, interval: this.currentInterval })
        });
        this.ppmWarningList = ppmWarningList;
        this.workshopUserStats = usersStats;
        this.ppmSummary = this.getSummaryPPM();
        this.crapCostSummary = this.getSummaryCrapCost();
        this.quanitySummary = this.getSummaryQuantity();
        this.defectQuantitySummary = this.getSummaryDefectQuantity();
      });
  }

  getSummaryPPM(): SummaryModel {
    return {
      value: this.dashboardPpmChartModel.items.map(x => x.ppm).reduce((partialSum, a) => partialSum + a, 0).toString(),
      title: "ppm",
      icon: "bar_chart",
      subtitle: this.subtitle != null ? this.subtitle : "",
      color: "#F35B5A",
    }
  }

  getSummaryCrapCost(): SummaryModel {
    return {
      value: this.dashboardCrapCostChartModel.items.map(x => x.value).reduce((partialSum, a) => partialSum + a, 0).toString(),
      title: "crapcost",
      icon: "euro",
      subtitle: this.subtitle != null ? this.subtitle : "",
      color: "#379DDA",
    }
  }

  getSummaryQuantity(): SummaryModel {
    let allDays = this.workshopProduction
      .flatMap(x => { return x.days });
    return {
      value: allDays.map(x => x.quantity).reduce((a, b) => b + a, 0).toString(),
      title: "quantity",
      icon: "show_chart",
      subtitle: this.subtitle != null ? this.subtitle : "",
      color: "#5CC953",
    }
  }
  getSummaryDefectQuantity(): SummaryModel {
    let allDays = this.workshopProduction
      .flatMap(x => { return x.days });
    return {
      value: allDays.map(x => x.defectQuantity).reduce((a, b) => b + a, 0).toString(),
      title: "defectQuantity",
      icon: "query_stats",
      subtitle: this.subtitle != null ? this.subtitle : "",
      color: "#F35B5A",
    }
  }
  ngOnInit(): void {

  }
  ngOnDestroy() {
    if (this.langChangeSubscription) this.langChangeSubscription.unsubscribe();
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();
  }
}
