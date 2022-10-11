import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MenuItemModel } from '../models/generated';
import { TreeItem } from '../models/tree-item';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private readonly httpClient: HttpClient, private readonly router: Router) { }

  getAccessMenu(): Observable<Array<TreeItem<MenuItemModel>>> {
    return this.httpClient.get<Array<TreeItem<MenuItemModel>>>('/Account/GetAccessMenu');
  }
  
}
