import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItemModel } from '../../models/generated';
import { TreeItem } from '../../models/tree-item';

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {

  constructor(private readonly httpClient: HttpClient) { }

  getAll(): Observable<Array<TreeItem<MenuItemModel>>> {
    return this.httpClient.get<Array<TreeItem<MenuItemModel>>>('/Menu/GetAll');
  }
}
