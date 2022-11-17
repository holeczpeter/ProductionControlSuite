import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { WorkshopPpmChartComponent } from './dashboard/workshop-ppm-chart/workshop-ppm-chart.component';


@NgModule({
  declarations: [
    DashboardComponent,
    WorkshopPpmChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
