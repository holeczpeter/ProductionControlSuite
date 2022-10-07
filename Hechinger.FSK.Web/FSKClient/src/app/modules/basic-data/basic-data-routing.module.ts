import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefectsComponent } from './defects/defects.component';
import { OperationsComponent } from './operations/operations.component';
import { ProductsComponent } from './products/products.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { WorkshopsComponent } from './workshops/workshops.component';

const routes: Routes = [
  {
    path: 'shift',
    component: ShiftsComponent,

  },
  {
    path: 'workshop',
    component: WorkshopsComponent,

  },
  {
    path: 'product',
    component: ProductsComponent,

  },
  {
    path: 'operation',
    component: OperationsComponent,

  },
  {
    path: 'defects',
    component: DefectsComponent,

  },
  {
    path: '**',
    redirectTo: 'workshop'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicDataRoutingModule { }
