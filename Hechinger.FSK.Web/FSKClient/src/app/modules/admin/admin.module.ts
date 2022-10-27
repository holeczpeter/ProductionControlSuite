import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { TranslateModule } from '@ngx-translate/core';
import { UserEditorDialogComponent } from './users/user-editor-dialog/user-editor-dialog.component';
import { RoleEditorDialogComponent } from './roles/role-editor-dialog/role-editor-dialog.component';
import { RoleMenuEditorComponent } from './roles/role-menu-editor/role-menu-editor.component';
import { RoleUserEditorComponent } from './roles/role-user-editor/role-user-editor.component';
import { UserWorkshopEditorComponent } from './users/user-editor-dialog/user-workshop-editor/user-workshop-editor.component';

@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    UserEditorDialogComponent,
    RoleEditorDialogComponent,
    RoleMenuEditorComponent,
    RoleUserEditorComponent,
    UserWorkshopEditorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
