import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicDataRoutingModule } from './basic-data-routing.module';
import { WorkshopsComponent } from './workshops/workshops.component';
import { WorkshopEditorDialogComponent } from './workshops/workshop-editor-dialog/workshop-editor-dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProductsComponent } from './products/products.component';
import { ProductEditorDialogComponent } from './products/product-editor-dialog/product-editor-dialog.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { ShiftEditorDialogComponent } from './shifts/shift-editor-dialog/shift-editor-dialog.component';
import { OperationsComponent } from './operations/operations.component';
import { OperationEditorDialogComponent } from './operations/operation-editor-dialog/operation-editor-dialog.component';
import { DefectsComponent } from './defects/defects.component';
import { DefectEditorDialogComponent } from './defects/defect-editor-dialog/defect-editor-dialog.component';
import { ProductWizardEditorComponent } from './products/product-wizard-editor/product-wizard-editor.component';

@NgModule({
  declarations: [
    WorkshopsComponent,
    WorkshopEditorDialogComponent,
    ProductsComponent,
    ProductEditorDialogComponent,
    ShiftsComponent,
    ShiftEditorDialogComponent,
    OperationsComponent,
    OperationEditorDialogComponent,
    DefectsComponent,
    DefectEditorDialogComponent,
    ProductWizardEditorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    BasicDataRoutingModule
  ]
})
export class BasicDataModule { }
