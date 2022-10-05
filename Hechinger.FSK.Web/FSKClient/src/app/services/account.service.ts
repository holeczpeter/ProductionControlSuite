import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ApiResult } from '../models/api-result';
import { LoginErrorTypes } from '../models/login-error-types';
import { RefreshTokenModel } from '../models/refresh-token-model';
import { UserDataModel } from '../models/user-data-model';
import { UserLoginModel } from '../models/user-login-model';
import { UserRegistrationModel } from '../models/user-registration-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  loginErrorType: LoginErrorTypes | undefined;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly dialogRef: MatDialog,
    //private readonly treeHelper: TreeHelperService
  ) { }

  //registration(model: UserRegistrationModel): Observable<ApiResult> {
  //  return this.httpClient.post<ApiResult>('Account/UserRegistration', model);
  //}

  //login(loginModel: UserLoginModel): Observable<UserDataModel> {

  //  return this.httpClient.post<UserDataModel>('Account/Login', loginModel).pipe(switchMap(x => {
  //    if (x) {
  //      if (x.userInfo.loginStatus == LoginErrorTypes.Success || x.userInfo.loginStatus == LoginErrorTypes.IsTemporaryPassword) {
  //        localStorage.setItem('userData', JSON.stringify(x));
  //      }
  //    }
  //    return of(x);
  //  }
  //  ));
  //}

  //refreshToken(): Observable<RefreshTokenModel> {
  //  const loginurl = "Token/Refresh";
  //  const token = this.getToken();
  //  const refreshToken = this.getRefreshToken();
  //  const sztsz = this.getSztsz();
  //  return this.httpClient.post<RefreshTokenModel>(loginurl, { sztsz: sztsz, token: token, refreshToken: refreshToken });
  //}

  //resetPassword(model: ResetPasswordModel): Observable<ApiResult> {
  //  return this.httpClient.post<ApiResult>('Account/ResetPassword', model);
  //}

  //changePassword(model: ChangePasswordModel): Observable<ApiResult> {
  //  return this.httpClient.post<ApiResult>('Account/ChangePassword', model);
  //}

  //checkPassword(sztsz: string, password: string): Observable<ApiResult> {
  //  return this.httpClient.post<ApiResult>('Account/CheckPassword', { 'sztsz': sztsz, 'password': password });
  //}

  //saveToken(token, refreshtoken) {
  //  let userData = JSON.parse(localStorage.getItem('userData'));
  //  userData.token = token;
  //  userData.refreshToken = refreshtoken;

  //  localStorage.setItem('userData', JSON.stringify(userData));
  //}

  //savePsAgreement() {
  //  let userData = (JSON.parse(localStorage.getItem('userData')) as UserDataModel);
  //  userData.userInfo.privacyStatementAgreed = true;
  //  localStorage.setItem('userData', JSON.stringify(userData));
  //}

  //getLoginStatus() {
  //  return (JSON.parse(localStorage.getItem('userData')) as UserDataModel).userInfo.loginStatus;
  //}

  //getUsername(): string {
  //  return (JSON.parse(localStorage.getItem('userData')) as UserDataModel).userInfo.fullName;
  //}

  //getSztsz(): string {
  //  return (JSON.parse(localStorage.getItem('userData')) as UserDataModel).userInfo.sztsz;
  //}

  //getTax(): string {
  //  return (JSON.parse(localStorage.getItem('userData')) as UserDataModel).userInfo.tax;
  //}

  //getUserInfo() {
  //  return (JSON.parse(localStorage.getItem('userData')) as UserDataModel).userInfo;
  //}

  //hasToken(): boolean {
  //  return !!(JSON.parse(localStorage.getItem('userData')) as UserDataModel).token;
  //}

  //isLoggedIn() {
  //  return !!localStorage.getItem('userData');

  //}

  //getToken(): string {
  //  if (this.isLoggedIn()) {
  //    return (JSON.parse(localStorage.getItem('userData')) as UserDataModel).token;
  //  }
  //  return null;

  //}

  //getRefreshToken() {
  //  return (JSON.parse(localStorage.getItem('userData')) as UserDataModel).refreshToken;

  //}

  //getAccessMenu(): Array<TreeItem> {
  //  return (JSON.parse(localStorage.getItem('userData')) as UserDataModel).accessMenus;

  //}
  //getHeaderInfo(): Observable<HeaderInfoModel> {
  //  return this.httpClient.get<HeaderInfoModel>('Account/GetHeaderInfo');
  //}

  //getpsAgreement(): boolean {
  //  return (JSON.parse(localStorage.getItem('userData')) as UserDataModel).userInfo.privacyStatementAgreed;
  //}

  //getPersonalLoginInformation(sztsz: string): Observable<LoginInformationModel> {
  //  return this.httpClient.get<LoginInformationModel>('Account/GetLoginInformation',
  //    {
  //      params: {
  //        sztsz: sztsz,
  //      }
  //    });
  //}

  //logout() {
  //  this.dialogRef.closeAll();
  //  if (!this.isLoggedIn()) {
  //    localStorage.clear();
  //    this.router.navigateByUrl('/account/login');
  //    return;
  //  }
  //  this.httpClient.post<boolean>('Account/Logout', { 'sztsz': this.getSztsz() }).subscribe(x => {
  //    localStorage.clear();
  //    this.router.navigateByUrl('/account/login');
  //  });
  //}

  //getPageSize() {
  //  return JSON.parse(localStorage.getItem("userData")).userInfo.pageSize;
  //}

  //setPageSize(pageSize: number) {
  //  let userData = JSON.parse(localStorage.getItem("userData")) as UserDataModel;
  //  userData.userInfo.pageSize = pageSize;
  //  localStorage.setItem("userData", JSON.stringify(userData));
  //}
}
