import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItemModel, MenuTypes } from '../../models/generated';
import { MenuDataService } from '../data/menu-data.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private menuItems!: Observable<Array<MenuItemModel>>;
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
