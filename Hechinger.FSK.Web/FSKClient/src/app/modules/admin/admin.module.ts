import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { TranslateModule } from '@ngx-translate/core';
import { UserEditorDialogComponent } from './users/user-editor-dialog/user-editor-dialog.component';
import { RoleEditorDialogComponent } from './roles/role-editor-dialog/role-editor-dialog.component';

@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    UserEditorDialogComponent,
    RoleEditorDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
