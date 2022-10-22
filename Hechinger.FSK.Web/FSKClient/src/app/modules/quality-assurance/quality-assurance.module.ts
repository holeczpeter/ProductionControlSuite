import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { QualityAssuranceRoutingModule } from './quality-assurance-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { QualityAssuranceComponent } from './quality-assurance/quality-assurance.component';
import { QualityAssuranceTableComponent } from './quality-assurance-table/quality-assurance-table.component';
import { CrapCostsComponent } from './crap-costs/crap-costs.component';


@NgModule({
  declarations: [
    QualityAssuranceComponent,
    QualityAssuranceTableComponent,
    CrapCostsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    QualityAssuranceRoutingModule
  ]
})
export class QualityAssuranceModule { }
