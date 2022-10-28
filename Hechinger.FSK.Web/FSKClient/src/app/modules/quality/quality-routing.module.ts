import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrapCostsComponent } from './crap-costs/crap-costs.component';
import { QualityHistoryMonthlyComponent } from './quality-history-monthly/quality-history-monthly.component';
import { QualityReportComponent } from './quality-report/quality-report.component';
import { QuantityReportComponent } from './quantity-report/quantity-report.component';
import { WorkerCompareStatisticsComponent } from './worker-compare-statistics/worker-compare-statistics.component';
import { WorkerDefectStatisticsComponent } from './worker-defect-statistics/worker-defect-statistics.component';

const routes: Routes = [
  {
    path: 'quantity-report',
    component: QuantityReportComponent,

  },
  {
    path: 'quality-report',
    component: QualityReportComponent,

  },
  {
    path: 'quality-history-monthly',
    component: QualityHistoryMonthlyComponent,

  },
  {
    path: 'crap-cost',
    component: CrapCostsComponent,

  },
  {
    path: 'worker/worker-defect-statistics',
    component: WorkerDefectStatisticsComponent,

  },
  {
    path: 'worker/worker-compare-statistics',
    component: WorkerCompareStatisticsComponent,

  },
  {
    path: '**',
    redirectTo: 'quality-assurance'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualityRoutingModule { }