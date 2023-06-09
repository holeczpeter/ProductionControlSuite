import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationCrapCostComponent } from './crap-costs/operation-crap-cost/operation-crap-cost.component';
import { ProductCrapCostComponent } from './crap-costs/product-crap-cost/product-crap-cost.component';
import { WorkshopCrapCostComponent } from './crap-costs/workshop-crap-cost/workshop-crap-cost.component';
import { QualityReportComponent } from './quality-report/quality-report.component';
import { DailyQuantityReportComponent } from './quantity-report/daily-quantity-report/daily-quantity-report.component';
import { WorkerCompareStatisticsComponent } from './worker-compare-statistics/worker-compare-statistics.component';
import { WorkerDefectStatisticsComponent } from './worker-defect-statistics/worker-defect-statistics.component';

const routes: Routes = [
  {
    path: 'quantity-report',
    component: DailyQuantityReportComponent,

  },
  {
    path: 'quality-report',
    component: QualityReportComponent,

  },
  
  {
    path: 'crap-cost/operation',
    component: OperationCrapCostComponent,

  },
  {
    path: 'crap-cost/product',
    component: ProductCrapCostComponent,

  },
  {
    path: 'crap-cost/workshop',
    component: WorkshopCrapCostComponent,

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
    redirectTo: 'quantity-report'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QualityRoutingModule { }
