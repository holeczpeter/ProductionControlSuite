import { DoCheck, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Component, Input, IterableDiffer, IterableDiffers, OnInit } from '@angular/core';
import { DefectCategories, WorkerStatisticModel } from '../../../../models/generated/generated';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexPlotOptions,
  ApexFill,
  ApexTooltip,
  ApexStroke,
  ApexLegend
} from "ng-apexcharts";
import { TranslateService } from '@ngx-translate/core';
import { ChartService } from '../../../../services/chart/chart.service';

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
};
@Component({
  selector: 'app-worker-compare-statistics-chart',
  templateUrl: './worker-compare-statistics-chart.component.html',
  styleUrls: ['./worker-compare-statistics-chart.component.scss']
})
export class WorkerCompareStatisticsChartComponent implements OnInit, DoCheck, OnChanges {
  @Input() items: Array<WorkerStatisticModel>;
  @Input() chartInfo: any;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;
  private _differ: IterableDiffer<any>;

  constructor(private differs: IterableDiffers,
    private readonly chartService: ChartService,
    public translateService: TranslateService) {
    this._differ = this.differs.find([]).create(this.trackByFn);
    this.translateService.onLangChange.subscribe(x => {
      this.createChart(x.lang);
    })
  }

  ngOnInit(): void {
  }

  ngDoCheck() {
    var changes = this._differ.diff(this.items);
    if (changes) this.createChart(this.translateService.currentLang);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartInfo'] && this.chartInfo) this.createChart(this.translateService.currentLang);
  }

  createChart(lang: string) {
    if (this.chartInfo && this.items) {
      let defectName = lang == 'hu' ? this.chartInfo.defect.name : this.chartInfo.defect.translatedName;
      const categories = this.items.map(x => x.workerCode);
      const data = this.items.map(x => { return { x: x.workerCode, y: x.ppm, fillColor: this.chartService.getColor(this.chartInfo.defect.defectCategory) } });

      this.chartOptions = {
        title: {
          text: defectName,
        },
        series: [
          {
            name: "PPM",
            data: data
          },
        ],
        chart: {
          height: 400,
          type: "bar",
          toolbar: {
            show: true
          },
          zoom: {
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded"
          }
        },
        xaxis: {
          categories: categories
        },
        yaxis: {
          name: 'PPM',
          seriesName: "PPM",
          title: { text: "PPM", },
          tooltip: {
            enabled: true,
            offsetX: 0,
          },
        },

      };
    }
  }
  trackByFn(index: number, item: any) {
    return index;
  }
}
