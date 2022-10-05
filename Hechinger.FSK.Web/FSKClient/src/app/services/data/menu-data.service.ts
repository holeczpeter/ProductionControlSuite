import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItemModel } from '../../models/menu-item-model';

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {

  constructor(private readonly httpClient: HttpClient) { }

  getAll(): Observable<Array<MenuItemModel>> {
    return this.httpClient.get<Array<MenuItemModel>>('/Menu/GetAll');
  }
}
