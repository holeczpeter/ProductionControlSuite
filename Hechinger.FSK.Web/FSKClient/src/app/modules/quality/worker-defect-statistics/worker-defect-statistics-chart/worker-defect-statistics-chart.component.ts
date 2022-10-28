import { Component, DoCheck, Input, IterableDiffer, IterableDiffers, OnInit } from '@angular/core';
import { DefectStatisticModel } from '../../../../models/generated/generated';

@Component({
  selector: 'app-worker-defect-statistics-chart',
  templateUrl: './worker-defect-statistics-chart.component.html',
  styleUrls: ['./worker-defect-statistics-chart.component.scss']
})
export class WorkerDefectStatisticsChartComponent implements OnInit, DoCheck {
  @Input() items: Array<DefectStatisticModel>;
  options: any;
  private _differ: IterableDiffer<any>;
  constructor(private differs: IterableDiffers) {
    this._differ = this.differs.find([]).create();
  }

  ngOnInit(): void {
  }
  ngDoCheck() {
    var changes = this._differ.diff(this.items);
    if (changes) {
      this.createChart();
    }
  }
  createChart() {
    const xAxisData = this.items.map(x => x.defectName)
    const data1 = this.items.map(x => x.ppm);

    this.options = {
      title: {
        text: 'Customized Pie',
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
        data: ['PPM']
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
          name: 'PPM',
          type: 'bar',
          barCategoryGap: '60%',
          data: data1,
          color: '#F35B5A',
          animation: true,

        },

      ]
    };
  }
}
