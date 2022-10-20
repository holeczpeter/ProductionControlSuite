import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItemModel, MenuTypes } from '../../models/generated';
import { TreeItem } from '../../models/tree-item';
import { AccountService } from '../account.service';
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
    if (!url) return '';
    if (url === '/') return "home";
    let result = url.split('/', 2)[1];
    return result;
  }
  constructor(private readonly accountService: AccountService) {
    this.menuItems = this.accountService.getAccessMenus();
  }
}
