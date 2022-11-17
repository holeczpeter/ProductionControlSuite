import { DoCheck, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Component, Input, IterableDiffer, IterableDiffers, OnInit } from '@angular/core';
import { DefectCategories, WorkerStatisticsModel } from '../../../../models/generated/generated';
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
import { DatePipe } from '@angular/common';

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
  selector: 'app-worker-compare-statistics-chart',
  templateUrl: './worker-compare-statistics-chart.component.html',
  styleUrls: ['./worker-compare-statistics-chart.component.scss']
})
export class WorkerCompareStatisticsChartComponent implements OnInit, OnChanges {
  @Input() model: WorkerStatisticsModel;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;

  constructor(private readonly chartService: ChartService,
    private readonly datePipe: DatePipe,
    public translateService: TranslateService) {
    this.translateService.onLangChange.subscribe(x => { this.createChart(x.lang); });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] && this.model) this.createChart(this.translateService.currentLang);
  }

  createChart(lang: string) {
    if (this.model) {
      const categories = this.model.items.map(x => x.workerCode);
      const data = this.model.items.map(x => { return { x: x.workerCode, y: x.ppm, fillColor: this.chartService.getColor(this.model.defectCategory) } });
      let defectName = lang == 'hu' ? this.model.defectName : this.model.defectTranslatedName;
      let startDate = this.translateService.currentLang == 'hu' ?
        this.datePipe.transform(this.model.startDate, 'yyyy.MM.dd') :
        this.datePipe.transform(this.model.startDate, 'dd.MM.yyyy');
      let endDate = this.translateService.currentLang == 'hu' ?
        this.datePipe.transform(this.model.startDate, 'yyyy.MM.dd') :
        this.datePipe.transform(this.model.endDate, 'dd.MM.yyyy');
     
      this.chartOptions = {
        title: {
          text: defectName,
        },
        subtitle: {
          text: startDate + "-" + endDate,
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
  
}
