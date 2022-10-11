import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { ChangePassword, GetAccessMenu, LoginModel, LoginResults, MenuItemModel, Result, TokenRequestModel, UserDataModel } from '../models/generated';
import { TreeItem } from '../models/tree-item';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  isLogin: boolean = false;
  isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public isLoggedInObservable(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  constructor(private readonly httpClient: HttpClient, private readonly router: Router, private dialogRef: MatDialog) { }

 

  login(request: LoginModel) {
    this.isLogin = true;
    this.router.navigate(['basic-data'])

    return this.httpClient.post<UserDataModel>('/Account/Login', request).pipe(switchMap(x => {
      if (x) {
        if (x.loginStatus == LoginResults.Success || x.loginStatus == LoginResults.IsTemporaryPassword) {
          localStorage.setItem('userData', JSON.stringify(x));
          //this.accesMenus.next(x.accessMenus);
          //let paths = new Array<string>();
          //x.accessMenus.forEach(treeItem => {
          //  paths = paths.concat(this.treeHelper.getSubMenuItems(treeItem).map(y => y.path));
          //});
          //localStorage.setItem('availablePaths', JSON.stringify(paths));
        }
      }
      this.isLoggedInSubject.next(true);
      return of(x);
    }
    ));
  }

  changePassword(request: ChangePassword) {
    return this.httpClient.post<Result>('/Account/ChangePassword', request)
  }

  getAccessMenu(request: GetAccessMenu): Observable<Array<TreeItem<MenuItemModel>>> {
    return this.httpClient.get<Array<TreeItem<MenuItemModel>>>('/Account/GetAccessMenu', { params: { 'userId': request.userId } });
  }
  logout() {
    this.dialogRef.closeAll();
    if (!this.isAuthenticated()) {
      localStorage.clear();
      this.router.navigateByUrl('/account/login');
      return;
    }
  }

  saveToken(token: string, refreshtoken: string) {
    let storage = localStorage.getItem('userData');
    if (storage != null) {
      let userData = JSON.parse(storage);
      userData.token = token;
      userData.refreshToken = refreshtoken;
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }
  refreshToken(): Observable<any> {
    const token = this.getToken();
    const refreshToken = this.getRefreshToken();
    const id = this.getUserId();
    const request: TokenRequestModel = { userId: id, token: token, refreshToken: refreshToken };
    return this.httpClient.post<any>("Token/Refresh", request) ;
  }
  getRefreshToken() {
    let storage = localStorage.getItem('userData');
    if (storage != null) return (JSON.parse(storage) as UserDataModel).refreshToken;
    else return "";
  }
  getLoginStatus() {
    let storage = localStorage.getItem('userData');
    if (storage != null) return (JSON.parse(storage) as UserDataModel).loginStatus;
    else return LoginResults.TokenError;
  }

  getUsername(): string {
    let storage = localStorage.getItem('userData');
    if (storage != null) return (JSON.parse(storage) as UserDataModel).userInfo.name;
    else return "";
  }

  getCode(): string {
    let storage = localStorage.getItem('userData');
    if (storage != null) return (JSON.parse(storage) as UserDataModel).userInfo.code;
    else return "";
  }

  getUserId() {
    let storage = localStorage.getItem('userData');
    if (storage != null) return (JSON.parse(storage) as UserDataModel).userInfo.id;
    else return 0;
  }

  isAuthenticated() {
    return !!localStorage.getItem('userData');
  }

  getToken(): string{
    let storage = localStorage.getItem('userData');
    if (this.isAuthenticated() && storage !=null) {
      return (JSON.parse(storage) as UserDataModel).token;
    }
    return "";

  }

}
