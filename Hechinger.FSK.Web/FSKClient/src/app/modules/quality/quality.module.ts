import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { QualityRoutingModule } from './quality-routing.module';
import { QualityHistoryMonthlyComponent } from './quality-history-monthly/quality-history-monthly.component';
import { QualityHistoryMonthyChartComponent } from './quality-history-monthly/quality-history-monthy-chart/quality-history-monthy-chart.component';
import { QualityHistoryMonthlyTableComponent } from './quality-history-monthly/quality-history-monthly-table/quality-history-monthly-table.component';
import { CrapCostsComponent } from './crap-costs/crap-costs.component';
import { SharedModule } from '../../shared/shared.module';
import { WorkerCompareStatisticsComponent } from './worker-compare-statistics/worker-compare-statistics.component';
import { WorkerDefectStatisticsComponent } from './worker-defect-statistics/worker-defect-statistics.component';
import { QuantityReportComponent } from './quantity-report/quantity-report.component';
import { QualityReportComponent } from './quality-report/quality-report.component';
import { WorkerCompareStatisticsChartComponent } from './worker-compare-statistics/worker-compare-statistics-chart/worker-compare-statistics-chart.component';
import { WorkerDefectStatisticsChartComponent } from './worker-defect-statistics/worker-defect-statistics-chart/worker-defect-statistics-chart.component';


@NgModule({
  declarations: [
    QualityHistoryMonthyChartComponent,
    QualityHistoryMonthlyTableComponent,
    QualityHistoryMonthlyComponent,
    CrapCostsComponent,
    WorkerCompareStatisticsComponent,
    WorkerDefectStatisticsComponent,
    QuantityReportComponent,
    QualityReportComponent,
    WorkerCompareStatisticsChartComponent,
    WorkerDefectStatisticsChartComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    QualityRoutingModule
  ],
  
})
export class QualityModule { }
