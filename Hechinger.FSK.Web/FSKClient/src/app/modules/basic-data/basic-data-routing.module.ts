import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { WorkshopsComponent } from './workshops/workshops.component';

const routes: Routes = [
  {
    path: 'workshop',
    component: WorkshopsComponent,

  },
  {
    path: 'product',
    component: ProductsComponent,

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
