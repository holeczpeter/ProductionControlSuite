import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DefectCategories, QuantityOperationReportModel } from '../../../../../models/generated/generated';
import { QuantityChartModel } from '../../../../../models/quantity-chart-model';
import { LanguageService } from '../../../../../services/language/language.service';

@Component({
  selector: 'app-operation-quantity-chart',
  templateUrl: './operation-quantity-chart.component.html',
  styleUrls: ['./operation-quantity-chart.component.scss']
})
export class OperationQuantityChartComponent implements OnInit, OnChanges {
  
  @Input() chartModel: QuantityOperationReportModel;
  @Input() chartTitle: string | null;
  options: any;
  chartModels: Array<QuantityChartModel>; 
  xAxisName: string;
  xAxisData: string[];
  operationName: string;
  constructor(public translateService: TranslateService) {
    this.translateService.get('defectName').subscribe(x => {
      this.xAxisName = x;
    });
    this.translateService.onLangChange.subscribe(x => {
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
    const xAxisData = lang == 'hu' ? this.chartModels.map(x => x.name) : this.chartModels.map(x => x.translatedName);
    const data01 = this.chartModels.map(x => { return { value: x.value, itemStyle: { color: this.getColor(x.category) } } });
    let categories = [1, 2, 3];
    this.options = {
      title: {
        text: this.chartTitle + "\n" + operationName + "\n" + this.chartModel.operationCode,
        left: 'center',
        
        color: '#ccc',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        }
      },
      xAxis: {
        name: this.xAxisName,
        nameLocation: 'center',
        nameTextStyle: {
          fontWeight:'bold'
        },
        nameGap: 60,
        axisLabel: {
          interval: 0,
          hideOverlap:false,
          show:true,
          width:'80',
          overflow:'break',
          
        },
        type: 'category',
        data: xAxisData,
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        name: 'PPM',
        nameLocation: 'center',
        nameTextStyle: {
          fontWeight: 'bold'
        },
        nameGap: 50,
        type: 'value'
      },
      series: [
        {
          name: 'PPM',
          data: data01,
          type: 'bar',
          categories,
        },
        
      ]
    };
    console.log(this.options)
  }
  getColor(category: DefectCategories): string {
    switch (category) {
      case 0: return '#FFCA39';
      case 1: return '#F35B5A';
      case 2: return '#379DDA';
      default: return '#F35B5A';
    }
  }
}
