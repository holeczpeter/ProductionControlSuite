import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { ApplicationSettingsComponent } from './application-settings/application-settings.component';
import { PasswordSettingsComponent } from './password-settings/password-settings.component';

const routes: Routes = [
  {
    path: 'application',
    component: ApplicationSettingsComponent,
    canDeactivate: [AuthGuard]
  },
  {
    path: 'password',
    component: PasswordSettingsComponent,
    canDeactivate: [AuthGuard]
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
