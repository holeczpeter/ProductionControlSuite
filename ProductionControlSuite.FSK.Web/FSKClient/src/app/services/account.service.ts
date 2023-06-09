import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { ChangePassword, ChangePasswordByAdmin, ForgotPassword, LoginModel, LoginResults, MenuItemModel, Result, TokenRequestModel, UserDataModel } from '../models/generated/generated';
import { TreeItem } from '../models/tree-item';
import { TreeService } from './tree/tree.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  avatarSubject = new BehaviorSubject<number>(Number(this.getAvatar()));
  public getavatar(): Observable<number> {
    return this.avatarSubject.asObservable();
  }
  isLogin: boolean = false;
  isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public isLoggedInObservable(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
  accesMenus = new BehaviorSubject<Array<TreeItem<MenuItemModel>>>(this.getAccessMenu());
  public getAccessMenus(): Observable<Array<TreeItem<MenuItemModel>>> {
    return this.accesMenus.asObservable();
  }
  constructor(private readonly httpClient: HttpClient,
    private readonly router: Router,
    private dialogRef: MatDialog,
    private readonly treeService: TreeService,
    private translateService: TranslateService) { }


  login(request: LoginModel) {

    return this.httpClient.post<UserDataModel>('Account/Login', request).pipe(switchMap(result => {
      if (result) {
        if (result.loginStatus == LoginResults.Success || result.loginStatus == LoginResults.IsTemporaryPassword) {
          localStorage.setItem('userData', JSON.stringify(result));
          this.setAvatar(result.avatarType);
          this.setLanguage(result)
          this.accesMenus.next(result.accessMenu);
          let paths = new Array<string>();
          result.accessMenu.forEach(treeItem => {
            paths = paths.concat(this.treeService.getSubMenuItems(treeItem).map(y => y.path));
          });
          localStorage.setItem('availablePaths', JSON.stringify(paths));
        }
      }
      this.isLoggedInSubject.next(true);
      return of(result);
    }
    ));
  }
  

  changeTemporaryPassword(request: ChangePassword) {
    return this.httpClient.post<Result>('Account/ChangeTemporaryPassword', request)
  }
  changePassword(request: ChangePassword) {
    return this.httpClient.post<Result>('Account/ChangePassword', request)
  }
  changePasswordByAdmin(request: ChangePasswordByAdmin) {
    return this.httpClient.post<Result>('Account/ChangePasswordByAdmin', request)
  }
  forgotPassword(request: ForgotPassword) {
    return this.httpClient.post<Result>('Account/ForgotPassword', request)
  }
  getAccessMenu() {
    let storage = localStorage.getItem('userData');
    if (storage != null) {
      return (JSON.parse(storage) as UserDataModel)?.accessMenu;
    }
    else return new Array<TreeItem<MenuItemModel>>();
   
  }
  logout() {
    this.dialogRef.closeAll();
    localStorage.clear();
    this.router.navigateByUrl('/account/login');
    return;
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
  setLanguage(userData: UserDataModel) {
    this.translateService.use(userData.languageCode);
    this.translateService.setDefaultLang(userData.languageCode);
  }
  getLanguage(): string {
    let storage = localStorage.getItem('userData');
    if (storage != null) return (JSON.parse(storage) as UserDataModel).languageCode;
    else return "";
  }
  getAvatar(): string {
    let storage = localStorage.getItem('userData');
    if (storage != null) return (JSON.parse(storage) as UserDataModel).avatarType.toString();
    else return "";
  }
  getRoleName(): string {
    let storage = localStorage.getItem('userData');
    if (storage != null) return (JSON.parse(storage) as UserDataModel).userInfo.roleName;
    else return "";
  }
  getRoleTranslatedName(): string {
    let storage = localStorage.getItem('userData');
    if (storage != null) {
      let r = (JSON.parse(storage) as UserDataModel);
      let name = r.userInfo.roleTranslatedName;
      return name;
    } 
    else return "";
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
  getPageSize() {
    let storage = localStorage.getItem('userData');
    if (storage != null) return (JSON.parse(storage) as UserDataModel).pageSize;
    else return 10;
  }
  setPageSize(pageSize: number) {
    let storage = localStorage.getItem('userData');
    if (storage) {
      let userData = JSON.parse(storage) as UserDataModel;
      userData.pageSize = pageSize;
      localStorage.setItem("userData", JSON.stringify(userData));
    }
    
  }
  setAvatar(avatarType: number) {
    let storage = localStorage.getItem('userData');
    if (storage) {
      let userData = JSON.parse(storage) as UserDataModel;
      
      userData.avatarType = avatarType;
      localStorage.setItem("userData", JSON.stringify(userData));
      this.avatarSubject.next(avatarType);
    }
    
  }
}
