import { DoCheck, IterableDiffer, IterableDiffers, OnChanges, SimpleChanges } from "@angular/core";
import { Component, ViewChild, OnInit, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
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
import { WorkshopModel, WorkshopPpmData } from "../../../../models/generated/generated";
import { WorkshopPpmModel } from "../../../../models/workshop-ppm-model";
import { ChartService } from "../../../../services/chart/chart.service";
import { WorkshopDataService } from "../../../../services/data/workshop-data.service";
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
export class WorkshopPpmChartComponent implements OnInit, OnChanges {
  @Input() model: WorkshopPpmModel;
  chartModels: Array<WorkshopPpmData>;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;
  
  constructor(public translateService: TranslateService,
    private chartService: ChartService) {
    this.translateService.onLangChange.subscribe(x => {
      this.createChart()
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model'] && this.model) {
      this.chartModels = this.model.items.sort((a, b) => b.ppm - a.ppm);
      this.createChart();
     
    }
    
  }
  getAllWorkshops() {
    
  }
  ngOnInit(): void {

  }
  
  createChart() {
    if (this.chartModels && this.model) {
      let title = this.translateService.instant("workshops").title;
      let data = this.chartModels.map(x => x.ppm);
      let subtitle = this.chartService.getChartInterval(this.model.interval);
      this.chartOptions = {
        title: {
          text: title
        },
        subtitle: {
          text: subtitle,
        },
        series: [
          {
            name: "PPM",
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
          title: 'PPM',
        },

      };
    }
   
  }
}
