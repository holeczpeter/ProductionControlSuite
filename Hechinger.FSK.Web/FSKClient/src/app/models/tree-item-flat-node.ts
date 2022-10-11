import { RoleMenuItem } from "./generated";
import { TreeItem } from "./tree-item";

export class TreeItemFlatNode {
  item!: TreeItem<RoleMenuItem>
  level!: number;
  expandable!: boolean;
}
