import { Injectable } from '@angular/core';
import { EntityGroupModel, EntityGroupRelationModel, MenuItemModel, MenuTypes, SaveEntityGroup } from '../../models/generated/generated';
import { TreeItem } from '../../models/tree-item';
import { TreeItemFlatNode } from '../../models/tree-item-flat-node';

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

  getRelations(element: TreeItem<EntityGroupModel>, level: number, currentLevel: number): TreeItem<EntityGroupModel> | null {
    currentLevel++;
    if (level == currentLevel) return element;
    if (element.children != null) {
      var i;
      var result = null;
      for (i = 0; result == null && i < element.children.length; i++) {
        result = this.getRelations(element.children[i], level, currentLevel);
      }
      return result;
    }
    return null;
  }
  addChild(element: TreeItem<EntityGroupModel>, child: TreeItem<EntityGroupModel>): TreeItem<EntityGroupModel> | null {
    element.children.push(child);
    return element;
  }
  removeChild(element: TreeItem<EntityGroupModel>, child: TreeItem<EntityGroupModel>): TreeItem<EntityGroupModel>  {
    var index = element.children.indexOf(child);
    if (index !== -1) {
      element.children.splice(index, 1);
    }
    return element;
  }
  addRelation(element: TreeItem<EntityGroupModel>, relation: EntityGroupRelationModel): TreeItem<EntityGroupModel> | null {
    element.node.relations.push(relation);
    return element;
  }
  removeRelation(element: TreeItem<EntityGroupModel>, relation: EntityGroupRelationModel): TreeItem<EntityGroupModel> | null {
    var index = element.node.relations.indexOf(relation);
    if (index !== -1) {
      element.node.relations.splice(index, 1);
    }
    return element;
  }
  
}
