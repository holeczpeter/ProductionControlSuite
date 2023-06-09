import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Subject, takeUntil } from 'rxjs';
import { GetMenuByRole, RoleMenuItem } from '../../../../models/generated/generated';
import { TreeItem } from '../../../../models/tree-item';
import { TreeItemFlatNode } from '../../../../models/tree-item-flat-node';
import { RoleDataService } from '../../../../services/data/role-data.service';

@Component({
  selector: 'app-role-menu-editor',
  templateUrl: './role-menu-editor.component.html',
  styleUrls: ['./role-menu-editor.component.scss']
})
export class RoleMenuEditorComponent implements OnInit, OnChanges, OnDestroy {
  @Input() roleId!: number;
  menu!: Array<TreeItem<RoleMenuItem>>;
  modules!: Array<any>;
  treeControl!: FlatTreeControl<TreeItemFlatNode<RoleMenuItem>>;
  treeFlattener!: MatTreeFlattener<TreeItem<RoleMenuItem>, TreeItemFlatNode<RoleMenuItem>>;
  flatNodeMap = new Map<TreeItemFlatNode<RoleMenuItem>, TreeItem<RoleMenuItem>>();
  nestedNodeMap = new Map<TreeItem<RoleMenuItem>, TreeItemFlatNode<RoleMenuItem>>();
  selectedParent: TreeItemFlatNode<RoleMenuItem> | null = null;
  checklistSelection = new SelectionModel<TreeItemFlatNode<RoleMenuItem>>(true);
  @Output() resfreshSelectionTree = new EventEmitter<SelectionModel<TreeItemFlatNode<RoleMenuItem>>>();
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly roleDataService: RoleDataService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["roleId"]) {
      let request: GetMenuByRole = { roleId: this.roleId };
      this.roleDataService.getMenuByRole(request).pipe(takeUntil(this.destroy$)).subscribe(menu => {
        this.menu = menu;
        this.modules = new Array<any>();
        this.menu.forEach((menu: TreeItem<RoleMenuItem>) => {
          let current = new Array<TreeItem<RoleMenuItem>>();
          current.push(menu);
          let treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
          let treeControl = new FlatTreeControl<TreeItemFlatNode<RoleMenuItem>>(this.getLevel, this.isExpandable);
          let module = {

            index: menu.node.id,
            label: menu.node.title,
            isEnabled: menu.node.isEnabled,
            dataSource: new MatTreeFlatDataSource(treeControl, treeFlattener),
            treeControl: treeControl,
          }
          module.dataSource.data = current;
          this.modules.push(module);
        });
        this.resfreshSelectionTree.emit(this.checklistSelection);

      });
    }
  }
  getLevel = (node: TreeItemFlatNode<RoleMenuItem>) =>   node.level ;

  isExpandable = (node: TreeItemFlatNode<RoleMenuItem>) => node.expandable;

  getChildren = (node: TreeItem<RoleMenuItem>): TreeItem<RoleMenuItem>[] => node.children;

  hasChild = (_: number, _nodeData: TreeItemFlatNode<RoleMenuItem>) => _nodeData.expandable;
  
  transformer = (node: TreeItem<RoleMenuItem>, level: number) => {
    
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.item === node
      ? existingNode
      : new TreeItemFlatNode<RoleMenuItem>();
    flatNode.item = node;
    flatNode.level = level;
    flatNode.expandable = node.children != null && node.children.length > 0 ? true : false;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    if (node.node.isEnabled && !this.checklistSelection.isSelected(flatNode)) this.checklistSelection.select(flatNode);
    return flatNode;
  }

  // Minden gyerek elem ki van-e jelöle.
  descendantsAllSelected(node: TreeItemFlatNode<RoleMenuItem>, treeControl: FlatTreeControl<TreeItemFlatNode<RoleMenuItem>>): boolean {
    const descendants = treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      child.item.node.isEnabled = true;
      return this.checklistSelection.isSelected(child);
    });
    return descAllSelected;
  }

  // Van-e a gyerek elemei között kijelölt és nincs-e mind kijelölve
  descendantsPartiallySelected(node: TreeItemFlatNode<RoleMenuItem>, treeControl: FlatTreeControl<TreeItemFlatNode<RoleMenuItem>>): boolean {
    const descendants = treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node, treeControl);
  }

  itemSelectionToggle(node: TreeItemFlatNode<RoleMenuItem>, treeControl: FlatTreeControl<TreeItemFlatNode<RoleMenuItem>>, event: MatCheckboxChange): void {
    this.select(node, treeControl);
  }

  select(node: TreeItemFlatNode<RoleMenuItem>, treeControl: FlatTreeControl<TreeItemFlatNode<RoleMenuItem>>) {
    this.checklistSelection.toggle(node);
    const descendants = treeControl.getDescendants(node);
    if (this.checklistSelection.isSelected(node)) {
      node.item.node.isEnabled = true;
      this.checklistSelection.select(...descendants);
      descendants.forEach(i => i.item.node.isEnabled = true);
    }
    else if (!this.checklistSelection.isSelected(node)) {
      node.item.node.isEnabled = false;
      this.checklistSelection.deselect(...descendants);
      descendants.forEach(i => i.item.node.isEnabled = false);
    }
    this.checkAllParentsSelection(node, treeControl);
    this.resfreshSelectionTree.emit(this.checklistSelection);
  }

  isSelected(treeNode: TreeItemFlatNode<RoleMenuItem>) {
    return this.checklistSelection.isSelected(treeNode);
  }

  checkAllParentsSelection(node: TreeItemFlatNode<RoleMenuItem>, treeControl: FlatTreeControl<TreeItemFlatNode<RoleMenuItem>>): void {
    let parent: TreeItemFlatNode<RoleMenuItem> | null = this.getParentNode(node, treeControl);
    while (parent) {
      this.checkRootNodeSelection(parent, treeControl);
      parent = this.getParentNode(parent, treeControl);
    }
  }

  checkRootNodeSelection(node: TreeItemFlatNode<RoleMenuItem>, treeControl: FlatTreeControl<TreeItemFlatNode<RoleMenuItem>>): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      child.item.node.isEnabled = true;
      return this.checklistSelection.isSelected(child);
    });
    const descendantsHaveSelected = descendants.some(child => this.checklistSelection.isSelected(child));
    if (nodeSelected && !descendantsHaveSelected) {
      node.item.node.isEnabled = false;
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected) {
      node.item.node.isEnabled = true;
      this.checklistSelection.select(node);
    }
  }

  getParentNode(node: TreeItemFlatNode<RoleMenuItem>, treeControl: FlatTreeControl<TreeItemFlatNode<RoleMenuItem>>): TreeItemFlatNode<RoleMenuItem> | null {
    const currentLevel = this.getLevel(node);
    if (currentLevel < 1) return null;
    const startIndex = treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = treeControl.dataNodes[i];
      if (this.getLevel(currentNode) < currentLevel) return currentNode;
    }
    return null;
  }
  getParentType(node: TreeItemFlatNode<RoleMenuItem>, treeControl: FlatTreeControl<TreeItemFlatNode<RoleMenuItem>>) {
    let parent = this.getParentNode(node, treeControl);
    return parent?.item.node.type;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
