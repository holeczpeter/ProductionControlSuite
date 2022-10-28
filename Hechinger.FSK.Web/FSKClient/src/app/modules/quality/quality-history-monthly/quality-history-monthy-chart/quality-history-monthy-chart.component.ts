import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DefectCategories, MonthlyQualityModel } from '../../../../models/generated/generated';
import { DateService } from '../../../../services/date.service';

@Component({
  selector: 'app-quality-history-monthy-chart',
  templateUrl: './quality-history-monthy-chart.component.html',
  styleUrls: ['./quality-history-monthy-chart.component.scss']
})
export class QualityHistoryMonthyChartComponent implements OnInit, OnChanges {
  @Input() data: MonthlyQualityModel;
  options: any;
  
  public get defectCategories(): typeof DefectCategories {
    return DefectCategories;
  }
  constructor(private dateService: DateService) {
  }


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.createChart();
    }
  }
  createChart() {
    this.dateService.getMonthExtension().subscribe(monthExtension => {
      const xAxisData = new Array<string>();
      const data1 = new Array<number>();
      monthExtension.forEach(x => {
        xAxisData.push(x.name);
      });
      for (var i = 1; i <= 13; i++) {
        let current = this.data.items.find(x => x.month == i)?.value;
        if (current) data1.push(current);
        else data1.push(0);
        let color = this.getColor(this.data.category);
        this.options = {
          title: {
            text: this.data.categoryName,
            left: 'center',
            top: 20,
            color: '#ccc',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            }
          },
          legend: {
            x: 'center',
            y: 'right',
            data: [this.data.categoryName]
          },
          xAxis: {
            data: xAxisData,
            axisTick: {
              alignWithLabel: true
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: this.data.categoryName,
              type: 'bar',
              barCategoryGap: '60%',
              data: data1,
              color: color,
              animation: true,

            },
          ]
        };
      }
    });
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
