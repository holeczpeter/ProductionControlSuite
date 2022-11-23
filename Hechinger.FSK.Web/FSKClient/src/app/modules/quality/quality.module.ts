import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { QualityRoutingModule } from './quality-routing.module';
import { QualityHistoryMonthlyComponent } from './quality-history-monthly/quality-history-monthly.component';
import { QualityHistoryMonthyChartComponent } from './quality-history-monthly/quality-history-monthy-chart/quality-history-monthy-chart.component';
import { QualityHistoryMonthlyTableComponent } from './quality-history-monthly/quality-history-monthly-table/quality-history-monthly-table.component';
import { SharedModule } from '../../shared/shared.module';
import { WorkerCompareStatisticsComponent } from './worker-compare-statistics/worker-compare-statistics.component';
import { WorkerDefectStatisticsComponent } from './worker-defect-statistics/worker-defect-statistics.component';
import { QualityReportComponent } from './quality-report/quality-report.component';
import { WorkerCompareStatisticsChartComponent } from './worker-compare-statistics/worker-compare-statistics-chart/worker-compare-statistics-chart.component';
import { WorkerDefectStatisticsChartComponent } from './worker-defect-statistics/worker-defect-statistics-chart/worker-defect-statistics-chart.component';
import { DailyQuantityReportComponent } from './quantity-report/daily-quantity-report/daily-quantity-report.component';
import { OperationQuantityTableComponent } from './quantity-report/shared/operation-quantity-table/operation-quantity-table.component';
import { SummaryQuantityReportComponent } from './quantity-report/summary-quantity-report/summary-quantity-report.component';
import { OperationQuantityChartComponent } from './quantity-report/shared/operation-quantity-chart/operation-quantity-chart.component';
import { WorkerCompareStatisticsTableComponent } from './worker-compare-statistics/worker-compare-statistics-table/worker-compare-statistics-table.component';
import { WorkerDefectStatisticsTableComponent } from './worker-defect-statistics/worker-defect-statistics-table/worker-defect-statistics-table.component';
import { CrapCostTableComponent } from './crap-costs/crap-cost-table/crap-cost-table.component';
import { CrapCostChartComponent } from './crap-costs/crap-cost-chart/crap-cost-chart.component';
import { ProductCrapCostComponent } from './crap-costs/product-crap-cost/product-crap-cost.component';
import { WorkshopCrapCostComponent } from './crap-costs/workshop-crap-cost/workshop-crap-cost.component';
import { OperationCrapCostComponent } from './crap-costs/operation-crap-cost/operation-crap-cost.component';


@NgModule({
  declarations: [
    QualityHistoryMonthyChartComponent,
    QualityHistoryMonthlyTableComponent,
    QualityHistoryMonthlyComponent,
    WorkerCompareStatisticsComponent,
    WorkerDefectStatisticsComponent,
    QualityReportComponent,
    WorkerCompareStatisticsChartComponent,
    WorkerDefectStatisticsChartComponent,
    DailyQuantityReportComponent,
    OperationQuantityTableComponent,
    SummaryQuantityReportComponent,
    OperationQuantityChartComponent,
    WorkerCompareStatisticsTableComponent,
    WorkerDefectStatisticsTableComponent,
    CrapCostTableComponent,
    CrapCostChartComponent,
    OperationCrapCostComponent,
    ProductCrapCostComponent,
    WorkshopCrapCostComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    QualityRoutingModule
  ],
  
})
export class QualityModule { }
