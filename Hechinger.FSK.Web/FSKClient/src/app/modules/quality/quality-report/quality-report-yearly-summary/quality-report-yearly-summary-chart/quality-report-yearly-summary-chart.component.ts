import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { DefectCategories, GroupReportYearlySummaryModel } from '../../../../../models/generated/generated';
import { DateService } from '../../../../../services/date.service';
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

} from "ng-apexcharts";
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ChartService } from '../../../../../services/chart/chart.service';
import { OnDestroy } from '@angular/core';
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
  selector: 'app-quality-report-yearly-summary-chart',
  templateUrl: './quality-report-yearly-summary-chart.component.html',
  styleUrls: ['./quality-report-yearly-summary-chart.component.scss']
})
export class QualityReportYearlySummaryChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() model: GroupReportYearlySummaryModel;
  @Input() chartTitle: string | null;
  @ViewChild("chart") chart: ChartComponent;
  langChangeSubscription: Subscription;
  public chartOptions!: Partial<ChartOptions> | any;
  public get defectCategories(): typeof DefectCategories {
    return DefectCategories;
  }
  constructor(private dateService: DateService,
    private readonly chartService: ChartService,
    public translateService: TranslateService) {
    if (this.langChangeSubscription) this.langChangeSubscription.unsubscribe();
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(x => {
      this.createChart(x.lang);
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['model'] && this.model) {
    this.createChart(this.translateService.currentLang);
  }
}

  createChart(lang: string) {
  console.log(this.model)
  let currentColor = this.chartService.getColor(this.model.category);
  let currentCategoryName = this.model.categoryName;
  let currentYear = this.model.year;
  let currentProductName = lang == 'hu' ? this.model.productName : this.model.productTranslatedName;
  let goalTitle = this.translateService.instant("goal");
  let xAxisTitle = this.translateService.instant("month");
  let avarageTitle = this.translateService.instant("avarage");
  let categories = new Array<string>();
  let data = new Array<number>();
  let months = lang == 'hu' ? this.dateService.hunMonth : this.dateService.deMonth;
  months.forEach(x => {
    categories.push(x);
  });
  categories.push(goalTitle);
  categories.push(avarageTitle);

  for (var i = 1; i < 13; i++) {
    let current = this.model.items.find(x => x.month == i)?.value;
    if (current) data.push(current);
    else data.push(0);

  };
  data.push(this.model.goal);
  data.push(this.model.avarage);
  this.chartOptions = {
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
    colors: [currentColor],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded"
      }
    },
    title: {
      text: currentProductName + " " + currentYear + " " + currentCategoryName,
    },
    xaxis: {
      title: {
        text: xAxisTitle,
        offsetY: 90,
      },
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
ngOnDestroy(): void {
  if(this.langChangeSubscription) this.langChangeSubscription.unsubscribe();
}
}

