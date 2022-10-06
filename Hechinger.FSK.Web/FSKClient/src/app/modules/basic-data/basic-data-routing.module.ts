import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkshopsComponent } from './workshops/workshops.component';

const routes: Routes = [
  {
    path: 'workshops',
    component: WorkshopsComponent,

  },
  {
    path: '**',
    redirectTo: 'workshops'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicDataRoutingModule { }
