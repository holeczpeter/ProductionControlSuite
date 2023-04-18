import { RoleMenuItem } from "./generated/generated";
import { TreeItem } from "./tree-item";

export class TreeItemFlatNode<T> {
  item!: TreeItem<T>
  level!: number;
  expandable!: boolean;
}
