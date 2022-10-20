import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { PasswordSettingsComponent } from './password-settings/password-settings.component';
import { ApplicationSettingsComponent } from './application-settings/application-settings.component';


@NgModule({
  declarations: [
    PasswordSettingsComponent,
    ApplicationSettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
