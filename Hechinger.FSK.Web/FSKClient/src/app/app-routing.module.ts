import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./modules/account/account.module').then(module => module.AccountModule),
  },
  {
    path: 'basic-data',
    loadChildren: () => import('./modules/basic-data/basic-data.module').then(module => module.BasicDataModule),
  },
  {
    path: 'defect-card',
    loadChildren: () => import('./modules/summary-card/summary-card.module').then(module => module.SummaryCardModule),
  },
  {
    path: 'report',
    loadChildren: () => import('./modules/quality-assurance/quality-assurance.module').then(module => module.QualityAssuranceModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(module => module.AdminModule),
  },
  {
    path: '**',
    redirectTo: 'basic-data'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
