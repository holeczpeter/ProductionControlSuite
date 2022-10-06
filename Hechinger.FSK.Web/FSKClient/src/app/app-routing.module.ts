import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'basic-data',
    loadChildren: () => import('./modules/basic-data/basic-data.module').then(module => module.BasicDataModule),
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
