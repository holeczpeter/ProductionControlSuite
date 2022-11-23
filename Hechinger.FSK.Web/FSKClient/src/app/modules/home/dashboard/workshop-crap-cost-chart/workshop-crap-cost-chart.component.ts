import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
    ApexAxisChartSeries,
    ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke,
    ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent
} from "ng-apexcharts";
import { Subscription } from "rxjs";
import { DashboardCrapCost, DashboardCrapCostChartModel } from "../../../../models/generated/generated";
import { ChartService } from "../../../../services/chart/chart.service";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};

@Component({
  selector: 'app-workshop-crap-cost-chart',
  templateUrl: './workshop-crap-cost-chart.component.html',
  styleUrls: ['./workshop-crap-cost-chart.component.scss']
})
export class WorkshopCrapCostChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() model: DashboardCrapCostChartModel;
  chartModels: Array<DashboardCrapCost>;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;
  langChangeSubscription: Subscription;
  constructor(public translateService: TranslateService,
    private chartService: ChartService) {
    
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(x => {
      this.createChart()
    });
  }
  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] && this.model) {
      this.chartModels = this.model.items.sort((a, b) => b.value - a.value);
      this.createChart();
    }
  }

  createChart() {
    if (this.chartModels && this.model) {
      let title = this.translateService.instant("workshops").title;
      let data = this.chartModels.map(x => x.value);
      let crapcost = this.translateService.instant("crapcost");
      let subtitle = this.chartService.getChartInterval(this.model.interval);
      this.chartOptions = {
        title: {
          text: title + " - " + crapcost,
        },
        subtitle: {
          text: subtitle,
        },
        series: [
          {
            name: crapcost,
            data: data
          }
        ],
        chart: {
          height: 350,
          type: "bar"
        },
        colors: ["#F35B5A"],
        xaxis: {
          categories: this.chartModels.map(x => x.workshopName)
        },
        yaxis: {
          show: true,
          title: crapcost,
        },
      };
    }
  }
  ngOnDestroy(): void {
    if (this.langChangeSubscription) this.langChangeSubscription.unsubscribe();
  }
}
