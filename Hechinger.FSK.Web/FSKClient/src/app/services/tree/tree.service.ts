import { Injectable } from '@angular/core';
import { MenuItemModel, MenuTypes } from '../../models/generated';
import { TreeItem } from '../../models/tree-item';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  getSubMenuItems(treeNode: TreeItem<MenuItemModel>, container?: Array<MenuItemModel>): Array<MenuItemModel> {
    if (!container)
      container = new Array<MenuItemModel>();
    if (treeNode.node.type == MenuTypes.SubMenu)
      container.push(treeNode.node);
    if (treeNode.children.length != 0)
      treeNode.children.forEach(x => this.getSubMenuItems(x, container));

    return container;
  }

}
