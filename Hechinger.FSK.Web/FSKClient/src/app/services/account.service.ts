import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { MenuItemModel } from '../models/generated';
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
  
  constructor(private readonly httpClient: HttpClient, private readonly router: Router) { }

  getAccessMenu(): Observable<Array<TreeItem<MenuItemModel>>> {
    return this.httpClient.get<Array<TreeItem<MenuItemModel>>>('/Account/GetAccessMenu');
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return this.isLogin;
  }
  login() {
    this.isLogin = true;
  }
}
