import { Component, DoCheck, Input, IterableDiffer, IterableDiffers, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DefectCategories, DefectStatisticModel } from '../../../../models/generated/generated';
import {
  ChartComponent,
  ApexYAxis,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexFill,
  ApexTooltip,
  ApexLegend,
  ApexStroke,
  ApexTitleSubtitle,
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
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-worker-defect-statistics-chart',
  templateUrl: './worker-defect-statistics-chart.component.html',
  styleUrls: ['./worker-defect-statistics-chart.component.scss']
})
export class WorkerDefectStatisticsChartComponent implements OnInit, DoCheck, OnChanges {
  @Input() items: Array<DefectStatisticModel>;
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
      let operationName = lang == 'hu' ? this.chartInfo.operation.name : this.chartInfo.operation.translatedName;
      const categories = lang == 'hu' ? this.items.map(x => x.defectName) : this.items.map(x => x.defectTranslatedName);
      const data = this.items.map(x => { return { x: lang == 'hu' ? x.defectName : x.defectTranslatedName, y: x.ppm, fillColor: this.chartService.getColor(x.defectCategory) } });
      const title = this.chartInfo.workerCode + " - " + operationName;
      this.chartOptions = {
        series: [
          {
            name: "PPM",
            data: data
          },
        ],
        chart: {
          height: 500,
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
        title: {
          text: title,
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
