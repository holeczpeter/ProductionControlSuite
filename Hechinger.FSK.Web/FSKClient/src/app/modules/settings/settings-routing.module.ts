import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationSettingsComponent } from './application-settings/application-settings.component';
import { PasswordSettingsComponent } from './password-settings/password-settings.component';

const routes: Routes = [
  {
    path: 'application',
    component: ApplicationSettingsComponent,
  },
  {
    path: 'password',
    component: PasswordSettingsComponent,
  },
  {
    path: '**',
    redirectTo: 'application'
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
