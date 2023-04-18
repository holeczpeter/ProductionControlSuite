import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeTemporaryPasswordComponent } from './change-temporary-password/change-temporary-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, data: { id: '1', name: "login" } },
      { path: 'change-temporary-password', component: ChangeTemporaryPasswordComponent, data: { id: '2', name: "change-temporary-password" } },
      { path: 'forgot-password', component: ForgotPasswordComponent, data: { id: '3', name: "forgot-password" } },
      { path: '**', redirectTo: 'login' }
    ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
