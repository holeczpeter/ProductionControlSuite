import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
    ApexAxisChartSeries,
    ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke,
    ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent
} from "ng-apexcharts";
import { Subscription } from "rxjs";
import { DashboardPpm, DashboardPpmChartModel } from "../../../../models/generated/generated";
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
  selector: 'app-workshop-ppm-chart',
  templateUrl: './workshop-ppm-chart.component.html',
  styleUrls: ['./workshop-ppm-chart.component.scss']
})
export class WorkshopPpmChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() model: DashboardPpmChartModel;
  chartModels: Array<DashboardPpm>;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;
  langChangeSubscription: Subscription;
  constructor(public translateService: TranslateService,
    private chartService: ChartService) {
    if (this.langChangeSubscription) this.langChangeSubscription.unsubscribe();
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(x => {
      this.createChart()
    });
  }
   
  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] && this.model) {
      this.chartModels = this.model.items.sort((a, b) => b.ppm - a.ppm);
      this.createChart();
    }
  }

  createChart() {
    if (this.chartModels && this.model) {
      let title = this.translateService.instant("workshops").title;
      let data = this.chartModels.map(x => x.ppm);
      let subtitle = this.chartService.getChartInterval(this.model.interval);
      this.chartOptions = {
        title: {
          text: title + " - PPM"
        },
        subtitle: {
          text: subtitle,
        },
        series: [
          {
            name: "PPM",
            data: data
          },

        ],
        chart: {
          redrawOnWindowResize: true,
          height: 350,
          type: "bar"
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded"
          }
        },
        colors: ["#F35B5A"],
        xaxis: {
          categories: this.chartModels.map(x => x.workshopName)
        },
        yaxis: {
          show: true,
          title: 'PPM',
        },

      };
    }
  }
  ngOnDestroy(): void {
    if (this.langChangeSubscription) this.langChangeSubscription.unsubscribe();
  }
}
