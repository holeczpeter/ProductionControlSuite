import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { OnChanges } from '@angular/core';
import { Component, EventEmitter, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { TranslateService } from '@ngx-translate/core';
import { AddNewTreeItem, EditTreeItem, EntityGroupModel, EntityGroupRelationModel, GroupTypes } from '../../../models/generated/generated';
import { TreeItem } from '../../../models/tree-item';
import { TreeItemFlatNode } from '../../../models/tree-item-flat-node';
import { AccountService } from '../../../services/account.service';
import { EntityGroupDataService } from '../../../services/data/entity-group-data.service';
import { ProductDataService } from '../../../services/data/product-data.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { CompareService } from '../../../services/sort/sort.service';
import { DefectFilterService } from '../../../services/table/defect-filter.service';
import { PaginationService } from '../../../services/table/pagination.service';
import { SortService } from '../../../services/table/sort.service';
import { TableExportService } from '../../../services/table/table-export.service';
import { TableFilterService } from '../../../services/table/table-filter.service';
import { TreeService } from '../../../services/tree/tree.service';
import { AddGroupDialogComponent } from './add-group-dialog/add-group-dialog.component';
import { DefectGroupWizardComponent } from './defect-group-wizard/defect-group-wizard.component';
import { EditGroupDialogComponent } from './edit-group-dialog/edit-group-dialog.component';


@Component({
  selector: 'app-defect-groups',
  templateUrl: './defect-groups.component.html',
  styleUrls: ['./defect-groups.component.scss']
})
export class DefectGroupsComponent implements OnInit {
  title = "defectgroups.title";
  results!: Array<TreeItem<EntityGroupModel>>;
  flatNodeMap = new Map<TreeItemFlatNode<EntityGroupModel>, TreeItem<EntityGroupModel>>();

  nestedNodeMap = new Map<TreeItem<EntityGroupModel>, TreeItemFlatNode<EntityGroupModel>>();

  selectedParent: TreeItemFlatNode<EntityGroupModel> | null = null;

  newItemName = '';

  treeControl: FlatTreeControl<TreeItemFlatNode<EntityGroupModel>>;

  treeFlattener: MatTreeFlattener<TreeItem<EntityGroupModel>, TreeItemFlatNode<EntityGroupModel>>;

  dataSource: MatTreeFlatDataSource<TreeItem<EntityGroupModel>, TreeItemFlatNode<EntityGroupModel>>;

  checklistSelection = new SelectionModel<TreeItemFlatNode<EntityGroupModel>>(true /* multiple */);

  getLevel = (node: TreeItemFlatNode<EntityGroupModel>) => node.level;

  isExpandable = (node: TreeItemFlatNode<EntityGroupModel>) => node.expandable;

  getChildren = (node: TreeItem<EntityGroupModel>): TreeItem<EntityGroupModel>[] => node.children;

  hasChild = (_: number, _nodeData: TreeItemFlatNode<EntityGroupModel>) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TreeItemFlatNode<EntityGroupModel>) => _nodeData.item.node.name === '';

  isNotItem = (_: number, _nodeData: TreeItemFlatNode<EntityGroupModel>) => _nodeData.item.node.groupType != GroupTypes.Item;

  transformer = (node: TreeItem<EntityGroupModel>, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node ? existingNode : new TreeItemFlatNode<EntityGroupModel>();
    flatNode.item = node;
    flatNode.level = level;
    flatNode.expandable = !!node.children?.length;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  public get groupTypes(): typeof GroupTypes {
    return GroupTypes;
  }
  constructor(private readonly productDataService: ProductDataService,
    private readonly entityGroupDataService: EntityGroupDataService,
    private readonly dialog: MatDialog,
    private readonly treeService: TreeService,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService,
    public tableFilterService: TableFilterService,
    public compareService: CompareService,
    public sortService: SortService,
    private readonly exportService: TableExportService,
    public paginationService: PaginationService,
    private readonly filterService: DefectFilterService) {
  }

  ngOnInit(): void {
    this.entityGroupDataService.getAll().subscribe(results => {
      this.results = results;
      this.treeFlattener = new MatTreeFlattener(
        this.transformer,
        this.getLevel,
        this.isExpandable,
        this.getChildren,
      );
      this.treeControl = new FlatTreeControl<TreeItemFlatNode<EntityGroupModel>>(this.getLevel, this.isExpandable);
      this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
      this.refresh(this.results);
    });
  }

  refresh(items: Array<TreeItem<EntityGroupModel>>) {
    this.dataSource.data = items;
  }

  descendantsAllSelected(node: TreeItemFlatNode<EntityGroupModel>): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    return descAllSelected;
  }

  descendantsPartiallySelected(node: TreeItemFlatNode<EntityGroupModel>): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  todoItemSelectionToggle(node: TreeItemFlatNode<EntityGroupModel>): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
    descendants.forEach(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  todoLeafItemSelectionToggle(node: TreeItemFlatNode<EntityGroupModel>): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  checkAllParentsSelection(node: TreeItemFlatNode<EntityGroupModel>): void {
    let parent: TreeItemFlatNode<EntityGroupModel> | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  checkRootNodeSelection(node: TreeItemFlatNode<EntityGroupModel>): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected =
      descendants.length > 0 &&
      descendants.every(child => {
        return this.checklistSelection.isSelected(child);
      });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  getParentNode(node: TreeItemFlatNode<EntityGroupModel>): TreeItemFlatNode<EntityGroupModel> | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) return null;

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
  onAdd() {
    let dialogRef = this.dialog.open(DefectGroupWizardComponent, {
      disableClose: true,
      autoFocus: false,
      data: 0,
      minWidth: '750px'
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }
  addGroupFromNode() {
    //let data: AddNewTreeItem = {
    //  parent: null,
    //  tree: this.results,
    //};
    //let dialogRef = this.dialog.open(AddGroupDialogComponent, {
    //  disableClose: true,
    //  autoFocus: false,
    //  data: data,
    //  minWidth: '600px'
    //});
    //dialogRef.afterClosed().subscribe((result) => { if (result) this.ngOnInit() });
  }

  addGroup(node: TreeItemFlatNode<EntityGroupModel>) {
    const parentNode = this.flatNodeMap.get(node);
    if (parentNode) {
      let data: AddNewTreeItem = {
        parent: parentNode,
        tree: this.results,
      };
      let dialogRef = this.dialog.open(AddGroupDialogComponent, {
        disableClose: true,
        autoFocus: false,
        data: data,
        minWidth: '600px'
      });
      dialogRef.afterClosed().subscribe((result) => { if (result) this.ngOnInit() });
    }
  }
  editGroup(node: TreeItemFlatNode<EntityGroupModel>) {
    const parentNode = this.flatNodeMap.get(node);
    if (parentNode) {
      let data: EditTreeItem = {
        current: parentNode,
        tree: this.results,
      };
      let dialogRef = this.dialog.open(EditGroupDialogComponent, {
        disableClose: true,
        autoFocus: false,
        data: data,
        minWidth: '600px'
      });
      dialogRef.afterClosed().subscribe((result) => { if (result) this.ngOnInit() });
    }
  }
  deleteGroup(node: TreeItemFlatNode<EntityGroupModel>) {

  }
  addItem(node: TreeItemFlatNode<EntityGroupModel>) {
   
  }

  editItem(node: TreeItemFlatNode<EntityGroupModel>) {
    
  }

  deleteItem(node: TreeItemFlatNode<EntityGroupModel>) {

  }
}
