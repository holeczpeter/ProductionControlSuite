import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { PasswordSettingsComponent } from './password-settings/password-settings.component';
import { ApplicationSettingsComponent } from './application-settings/application-settings.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    PasswordSettingsComponent,
    ApplicationSettingsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
