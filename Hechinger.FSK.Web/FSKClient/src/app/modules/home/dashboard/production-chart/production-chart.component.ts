import { DatePipe } from "@angular/common";
import { DoCheck, IterableDiffer, IterableDiffers, OnChanges, SimpleChanges } from "@angular/core";
import { Component, ViewChild, OnInit, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { addDays } from 'date-fns';
import format from 'date-fns/fp/format';
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
  ApexResponsive,
} from "ng-apexcharts";
import { CrapCostWorkshopModel, DashboardCrapCost, WorkshopModel, WorkshopPpmData } from "../../../../models/generated/generated";
import { WorkshopCrapCostModel } from '../../../../models/workshop-crap-cost-model';
import { WorkshopPpmModel } from "../../../../models/workshop-ppm-model";
import { WorkshopProductionInfo } from "../../../../models/workshop-production-info";
import { ChartService } from "../../../../services/chart/chart.service";
import { WorkshopDataService } from "../../../../services/data/workshop-data.service";
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
export class ProductionChartComponent implements OnInit, OnChanges {
  @Input() model: WorkshopProductionInfo;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;

  constructor(public translateService: TranslateService,
    private readonly datePipe: DatePipe,
    private readonly dateService: DateService,
    private chartService: ChartService) {
    this.translateService.onLangChange.subscribe(x => {
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
}

