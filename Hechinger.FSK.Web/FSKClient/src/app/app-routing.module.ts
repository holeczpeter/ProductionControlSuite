import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './layout/layout/layout.component';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./modules/account/account.module').then(module => module.AccountModule),
  },
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(module => module.HomeModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: 'basic-data',
        loadChildren: () => import('./modules/basic-data/basic-data.module').then(module => module.BasicDataModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: 'defect-card',
        loadChildren: () => import('./modules/summary-card/summary-card.module').then(module => module.SummaryCardModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: 'report',
        loadChildren: () => import('./modules/quality-assurance/quality-assurance.module').then(module => module.QualityAssuranceModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: 'admin',
        loadChildren: () => import('./modules/admin/admin.module').then(module => module.AdminModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.module').then(module => module.SettingsModule),
        canLoad: [AuthGuard],
        canActivateChild: [AuthGuard],
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
