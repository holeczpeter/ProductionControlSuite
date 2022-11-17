import { DoCheck, IterableDiffer, IterableDiffers } from "@angular/core";
import { Component, ViewChild, OnInit, Input } from "@angular/core";
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
import { WorkshopPpmData } from "../../../../models/generated/generated";

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
  selector: 'app-workshop-ppm-chart',
  templateUrl: './workshop-ppm-chart.component.html',
  styleUrls: ['./workshop-ppm-chart.component.scss']
})
export class WorkshopPpmChartComponent implements OnInit, DoCheck {
  @Input() workshopPpmList: Array<WorkshopPpmData>;
  chartModels: Array<WorkshopPpmData>;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;
  private _differ: IterableDiffer<any>;
  constructor(private differs: IterableDiffers) {
    this._differ = this.differs.find([]).create(this.trackByFn);
  }
  ngOnInit(): void {

  }
  ngDoCheck(): void {
    const changes = this._differ.diff(this.workshopPpmList);
    if (changes) {
      this.chartModels = this.workshopPpmList.sort((a, b) => b.ppm - a.ppm);
      this.createChart()
    }
  }
  createChart() {
    let data = this.chartModels.map(x => x.ppm);
    this.chartOptions = {
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
      title: {
        text: "Műhelyek"
      },
      xaxis: {
        categories: this.chartModels.map(x => x.workshopName)
      },
      yaxis: {
        show: true,
        title: 'PPM',
      },
      
    };
  }


  trackByFn(index: number, item: any) {
    return index;
  }
}
