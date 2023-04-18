import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DefectCategories, QuantityOperationReportModel } from '../../../../../models/generated/generated';
import { QuantityChartModel } from '../../../../../models/quantity-chart-model';
import { LanguageService } from '../../../../../services/language/language.service';
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
import { ChartService } from '../../../../../services/chart/chart.service';
import { Subscription } from 'rxjs';
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
  selector: 'app-operation-quantity-chart',
  templateUrl: './operation-quantity-chart.component.html',
  styleUrls: ['./operation-quantity-chart.component.scss']
})
export class OperationQuantityChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() chartModel: QuantityOperationReportModel;
  @Input() chartTitle: string | null;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;
  chartModels: Array<QuantityChartModel>; 
  langChangeSubscription: Subscription;
  constructor(public translateService: TranslateService,
    private readonly chartService: ChartService) {
    if (this.langChangeSubscription) this.langChangeSubscription.unsubscribe();
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(x => {
      this.createChart(x.lang);
    })
  }
  
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartModel'] && this.chartModel) {
      this.chartModels = this.chartModel.defects.sort((a, b) => b.ppm - a.ppm).map(x => {
        let item: QuantityChartModel = {
          id: x.defectId,
          code: x.defectCode,
          name: x.defectName,
          translatedName: x.defectTranslatedName,
          value: x.ppm,
          category: x.defectCategory,
        }
        return item;
      });
      this.createChart(this.translateService.currentLang);
    }
  }

  
  createChart(lang: string) {
    let operationName = this.translateService.currentLang == 'hu' ? this.chartModel.operationName : this.chartModel.operationTranslatedName;
    const categories = lang == 'hu' ? this.chartModels.map(x => x.name) : this.chartModels.map(x => x.translatedName);
    const data = this.chartModels.map(x => { return { x: x.name, y: x.value, fillColor: this.chartService.getColor(x.category) } });
    let xAxisName = this.translateService.instant('defectName');
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
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      title: {
        text: this.chartTitle + "\n" + operationName + "\n" + this.chartModel.operationCode,
      },
      xaxis: {
        title: { text: xAxisName, offsetY: 200, },
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
    if (this.langChangeSubscription) this.langChangeSubscription.unsubscribe();
  }
}
