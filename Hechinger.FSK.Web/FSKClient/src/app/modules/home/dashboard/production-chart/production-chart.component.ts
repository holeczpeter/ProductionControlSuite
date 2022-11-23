import { DatePipe } from "@angular/common";
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { addDays } from 'date-fns';
import format from 'date-fns/fp/format';
import {
    ApexAxisChartSeries,
    ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexResponsive, ApexStroke,
    ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis, ChartComponent
} from "ng-apexcharts";
import { Subscription } from "rxjs";
import { ProductionInfoChartModel } from "../../../../models/generated/generated";
import { ChartService } from "../../../../services/chart/chart.service";
import { DateService } from "../../../../services/date.service";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  responsive: ApexResponsive,
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  subtitle: ApexTitleSubtitle;
};
@Component({
  selector: 'app-production-chart',
  templateUrl: './production-chart.component.html',
  styleUrls: ['./production-chart.component.scss']
})
export class ProductionChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() model: ProductionInfoChartModel;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;
  langChangeSubscription: Subscription;
  constructor(public translateService: TranslateService,
    private readonly datePipe: DatePipe,
    private readonly dateService: DateService,
    private chartService: ChartService) {
    if (this.langChangeSubscription) this.langChangeSubscription.unsubscribe();
    this.langChangeSubscription = this.langChangeSubscription = this.translateService.onLangChange.subscribe(x => {
      this.createChart()
    });
  }
  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] && this.model) {
      this.createChart();
    }

  }
  getAllWorkshops() {

  }
  ngOnInit(): void {

  }

  createChart() {
    let quantitydata = new Array<number>();
    let defectdata = new Array<number>();
    let categories = new Array<string>();
    let quantityTitle = this.translateService.instant("quantity");
    let defectQuantityTitle = this.translateService.instant("defectQuantity");
    for (var i = 0; i < this.model.interval.differenceInCalendarDays; i++) {
      
      let currentDate = addDays(this.model.interval.startDate, i);
      let currentDateText = this.dateService.getDateTextByCurrentLang(currentDate);
      if (currentDateText == null) currentDateText = format('yyyy-MM-dd', new Date(currentDate));
      let current = this.model.item.days.find(day => format('yyyy-MM-dd', new Date(day.date)).trim() == format('yyyy-MM-dd', currentDate).trim());
      if (current) {
        quantitydata.push(current.quantity);
        defectdata.push(current.defectQuantity);
      }
      else {
        quantitydata.push(0);
        defectdata.push(0);
      }
      categories.push(currentDateText);
     
    };
    let title = this.model.item.workshopName;
    let subtitle = this.chartService.getChartInterval(this.model.interval);
    this.chartOptions = {
      title: {
        text: title,
      },
      subtitle: {
        text: subtitle,
      },
      series: [
        {
          name: quantityTitle,
          data: quantitydata
        },
        {
          name: defectQuantityTitle,
          data: defectdata
        }
      ],
      chart: {
        height: 350,
        type: "bar",
        foreColor: '#373d3f'
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#5CC953', '#F35B5A'],
      xaxis: {
        categories: categories,
      },
      yaxis: {
        show: true,
        title: "",
      },
      responsive: [
        {
          breakpoint: 1000,
          options: {
            plotOptions: {
              bar: {
                horizontal: false
              }
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
    };
    

  }
  ngOnDestroy(): void {
    if (this.langChangeSubscription) this.langChangeSubscription.unsubscribe();
  }
}

