import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { QualityAssuranceDataService } from '../../../services/data/quality-assurance-data.service';

@Component({
  selector: 'app-quality-assurance',
  templateUrl: './quality-assurance.component.html',
  styleUrls: ['./quality-assurance.component.scss']
})
export class QualityAssuranceComponent implements OnInit {
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  constructor(private readonly qualityAssuranceDataService: QualityAssuranceDataService) { }

  ngOnInit(): void {
    this.qualityAssuranceDataService.get().subscribe(x => {
      console.log(x);
      
    });
  }
 
}

