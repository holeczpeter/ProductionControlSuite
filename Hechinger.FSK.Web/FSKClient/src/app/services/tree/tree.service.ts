import { Injectable } from '@angular/core';
import { EntityGroupModel, MenuItemModel, MenuTypes, SaveEntityGroup } from '../../models/generated/generated';
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

  search(element: TreeItem<EntityGroupModel>, id: number): TreeItem<EntityGroupModel> | null {
    if (element.node.id == id) return element;
    else if (element.children != null) {
      var i;
      var result = null;
      for (i = 0; result == null && i < element.children.length; i++) {
        result = this.search(element.children[i], id);
      }
      return result;
    }
    return null;
  }
 
}
