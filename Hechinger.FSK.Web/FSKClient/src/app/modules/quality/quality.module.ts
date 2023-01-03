import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { QualityRoutingModule } from './quality-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { WorkerCompareStatisticsComponent } from './worker-compare-statistics/worker-compare-statistics.component';
import { WorkerDefectStatisticsComponent } from './worker-defect-statistics/worker-defect-statistics.component';
import { QualityReportComponent } from './quality-report/quality-report.component';
import { WorkerCompareStatisticsChartComponent } from './worker-compare-statistics/worker-compare-statistics-chart/worker-compare-statistics-chart.component';
import { WorkerDefectStatisticsChartComponent } from './worker-defect-statistics/worker-defect-statistics-chart/worker-defect-statistics-chart.component';
import { DailyQuantityReportComponent } from './quantity-report/daily-quantity-report/daily-quantity-report.component';
import { OperationQuantityTableComponent } from './quantity-report/shared/operation-quantity-table/operation-quantity-table.component';
import { OperationQuantityChartComponent } from './quantity-report/shared/operation-quantity-chart/operation-quantity-chart.component';
import { WorkerCompareStatisticsTableComponent } from './worker-compare-statistics/worker-compare-statistics-table/worker-compare-statistics-table.component';
import { WorkerDefectStatisticsTableComponent } from './worker-defect-statistics/worker-defect-statistics-table/worker-defect-statistics-table.component';
import { CrapCostTableComponent } from './crap-costs/crap-cost-table/crap-cost-table.component';
import { CrapCostChartComponent } from './crap-costs/crap-cost-chart/crap-cost-chart.component';
import { ProductCrapCostComponent } from './crap-costs/product-crap-cost/product-crap-cost.component';
import { WorkshopCrapCostComponent } from './crap-costs/workshop-crap-cost/workshop-crap-cost.component';
import { OperationCrapCostComponent } from './crap-costs/operation-crap-cost/operation-crap-cost.component';
import { QualityMenuComponent } from './quality-report/quality-menu/quality-menu.component';
import { QualityGroupReportComponent } from './quality-report/quality-group-report/quality-group-report.component';
import { QualityGroupReportWeeklyTableComponent } from './quality-report/quality-group-report/quality-group-report-weekly-table/quality-group-report-weekly-table.component';
import { GualityGroupReportWeeklyChartComponent } from './quality-report/quality-group-report/guality-group-report-weekly-chart/guality-group-report-weekly-chart.component';
import { QualityReportYearlySummaryComponent } from './quality-report/quality-report-yearly-summary/quality-report-yearly-summary.component';
import { QualityReportYearlySummaryTableComponent } from './quality-report/quality-report-yearly-summary/quality-report-yearly-summary-table/quality-report-yearly-summary-table.component';
import { QualityReportYearlySummaryChartComponent } from './quality-report/quality-report-yearly-summary/quality-report-yearly-summary-chart/quality-report-yearly-summary-chart.component';


@NgModule({
  declarations: [
    WorkerCompareStatisticsComponent,
    WorkerDefectStatisticsComponent,
    QualityReportComponent,
    WorkerCompareStatisticsChartComponent,
    WorkerDefectStatisticsChartComponent,
    DailyQuantityReportComponent,
    OperationQuantityTableComponent,
    OperationQuantityChartComponent,
    WorkerCompareStatisticsTableComponent,
    WorkerDefectStatisticsTableComponent,
    CrapCostTableComponent,
    CrapCostChartComponent,
    OperationCrapCostComponent,
    ProductCrapCostComponent,
    WorkshopCrapCostComponent,
    QualityMenuComponent,
    QualityGroupReportComponent,
    QualityGroupReportWeeklyTableComponent,
    GualityGroupReportWeeklyChartComponent,
    QualityReportYearlySummaryComponent,
    QualityReportYearlySummaryTableComponent,
    QualityReportYearlySummaryChartComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    QualityRoutingModule
  ],
  
})
export class QualityModule { }
