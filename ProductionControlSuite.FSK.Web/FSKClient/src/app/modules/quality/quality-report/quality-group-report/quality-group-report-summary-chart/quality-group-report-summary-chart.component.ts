import { Component, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChartComponent } from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { GroupReportModel, OperationItem } from '../../../../../models/generated/generated';
import { QuantityChartModel } from '../../../../../models/quantity-chart-model';
import { ChartService } from '../../../../../services/chart/chart.service';
import { ChartOptions } from '../../quality-report-yearly-summary/quality-report-yearly-summary-chart/quality-report-yearly-summary-chart.component';

@Component({
  selector: 'app-quality-group-report-summary-chart',
  templateUrl: './quality-group-report-summary-chart.component.html',
  styleUrls: ['./quality-group-report-summary-chart.component.scss']
})
export class QualityGroupReportSummaryChartComponent implements OnInit, OnDestroy {
  @Input() chartModel: GroupReportModel;
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
      let items = this.chartModel.items.flatMap(x => x.defects);
      this.chartModels = items.sort((a, b) => b.ppm - a.ppm).map(x => {
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
        text: this.chartTitle + "\n",
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
