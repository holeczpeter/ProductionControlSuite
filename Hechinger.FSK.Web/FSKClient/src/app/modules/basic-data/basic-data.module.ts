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
import { ProductContextEditorComponent } from './products/product-wizard-editor/product-context-editor/product-context-editor.component';
import { OperationContextEditorComponent } from './products/product-wizard-editor/operation-context-editor/operation-context-editor.component';
import { DefectContextEditorComponent } from './products/product-wizard-editor/defect-context-editor/defect-context-editor.component';
import { DefectGroupsComponent } from './defect-groups/defect-groups.component';
import { DefectGroupWizardComponent } from './defect-groups/defect-group-wizard/defect-group-wizard.component';
import { DefectGroupDataEditorComponent } from './defect-groups/defect-group-wizard/defect-group-data-editor/defect-group-data-editor.component';
import { DefectGroupProductEditorComponent } from './defect-groups/defect-group-wizard/defect-group-product-editor/defect-group-product-editor.component';
import { DefectGroupContextEditorComponent } from './defect-groups/defect-group-wizard/defect-group-context-editor/defect-group-context-editor.component';
import { AddGroupDialogComponent } from './defect-groups/add-group-dialog/add-group-dialog.component';
import { EditGroupDialogComponent } from './defect-groups/edit-group-dialog/edit-group-dialog.component';

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
    ProductWizardEditorComponent,
    ProductContextEditorComponent,
    OperationContextEditorComponent,
    DefectContextEditorComponent,
    DefectGroupsComponent,
    DefectGroupWizardComponent,
    DefectGroupDataEditorComponent,
    DefectGroupProductEditorComponent,
    DefectGroupContextEditorComponent,
    AddGroupDialogComponent,
    EditGroupDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    BasicDataRoutingModule
  ]
})
export class BasicDataModule { }
