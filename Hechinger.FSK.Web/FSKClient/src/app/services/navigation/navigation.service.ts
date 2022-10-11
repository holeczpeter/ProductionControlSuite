import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItemModel, MenuTypes } from '../../models/generated';
import { TreeItem } from '../../models/tree-item';
import { MenuDataService } from '../data/menu-data.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private menuItems!: Observable<Array<TreeItem<MenuItemModel>>>;
  public getMenuItems() {
    return this.menuItems;
  }
 
  moduleNameFromUrl(url: string) {
    console.log(url)
    if (!url) return '';
    if (url === '/') return "home";
    let result = url.split('/', 2)[1];
    return result;
  }
  constructor(private readonly menudataService: MenuDataService) {
    this.menuItems = this.menudataService.getAll();
  }
}
