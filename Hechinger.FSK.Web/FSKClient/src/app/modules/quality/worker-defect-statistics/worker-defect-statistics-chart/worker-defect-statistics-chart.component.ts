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
  selector: 'app-worker-defect-statistics-chart',
  templateUrl: './worker-defect-statistics-chart.component.html',
  styleUrls: ['./worker-defect-statistics-chart.component.scss']
})
export class WorkerDefectStatisticsChartComponent implements OnInit, OnChanges {
  @Input() model: DefectStatisticModel;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;

  constructor(private readonly chartService: ChartService,
    private readonly datePipe: DatePipe,
    public translateService: TranslateService) {
    this.translateService.onLangChange.subscribe(x => {
      this.createChart(x.lang);
    })
  }

  ngOnInit(): void {
  }
 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] && this.model) this.createChart(this.translateService.currentLang);
  }
  createChart(lang: string) {
    if (this.model) {
      let operationName = lang == 'hu' ? this.model.operationName : this.model.operationTranslatedName;
      const categories = lang == 'hu' ? this.model.items.map(x => x.defectName) : this.model.items.map(x => x.defectTranslatedName);
      const data = this.model.items.map(x => { return { x: lang == 'hu' ? x.defectName : x.defectTranslatedName, y: x.ppm, fillColor: this.chartService.getColor(x.defectCategory) } });
      const title = this.model.workerCode + " - " + operationName;
      let startDate = this.translateService.currentLang == 'hu' ?
        this.datePipe.transform(this.model.startDate, 'yyyy.MM.dd') :
        this.datePipe.transform(this.model.startDate, 'dd.MM.yyyy');
      let endDate = this.translateService.currentLang == 'hu' ?
        this.datePipe.transform(this.model.startDate, 'yyyy.MM.dd') :
        this.datePipe.transform(this.model.endDate, 'dd.MM.yyyy');
      this.chartOptions = {
        title: {
          text: title,
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
