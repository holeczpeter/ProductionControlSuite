import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QualityAssuranceComponent } from './quality-assurance/quality-assurance.component';

const routes: Routes = [
  {
    path: 'quality-assurance',
    component: QualityAssuranceComponent,

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
export class QualityAssuranceRoutingModule { }
