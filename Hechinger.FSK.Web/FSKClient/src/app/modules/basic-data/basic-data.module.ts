import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDataRoutingModule } from './basic-data-routing.module';
import { WorkshopsComponent } from './workshops/workshops.component';
import { WorkshopEditorDialogComponent } from './workshops/workshop-editor-dialog/workshop-editor-dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    WorkshopsComponent,
    WorkshopEditorDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    BasicDataRoutingModule
  ]
})
export class BasicDataModule { }
