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
import { DefectGroupOperationEditorComponent } from './defect-groups/defect-group-wizard/defect-group-operation-editor/defect-group-operation-editor.component';
import { DefectGroupDefectEditorComponent } from './defect-groups/defect-group-wizard/defect-group-defect-editor/defect-group-defect-editor.component';
import { DefectGroupOperationChildComponent } from './defect-groups/defect-group-wizard/defect-group-operation-editor/defect-group-operation-child/defect-group-operation-child.component';
import { DefectGroupDefectChildComponent } from './defect-groups/defect-group-wizard/defect-group-defect-editor/defect-group-defect-child/defect-group-defect-child.component';
import { OperationListComponent } from './products/operation-list/operation-list.component';
import { DefectListComponent } from './operations/defect-list/defect-list.component';



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
    DefectGroupOperationEditorComponent,
    DefectGroupDefectEditorComponent,
    DefectGroupOperationChildComponent,
    DefectGroupDefectChildComponent,
    OperationListComponent,
    DefectListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    BasicDataRoutingModule
  ]
})
export class BasicDataModule { }
