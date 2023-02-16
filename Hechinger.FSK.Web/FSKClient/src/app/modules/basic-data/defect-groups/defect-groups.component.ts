import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { TranslateService } from '@ngx-translate/core';
import { DeleteEntityGroup, EntityGroupModel, EntityGroupRelationModel, GroupTypes } from '../../../models/generated/generated';
import { TreeItem } from '../../../models/tree-item';
import { TreeItemFlatNode } from '../../../models/tree-item-flat-node';
import { ConfirmDialogService } from '../../../services/confirm-dialog/confirm-dialog-service';
import { EntityGroupDataService } from '../../../services/data/entity-group-data.service';
import { ProductDataService } from '../../../services/data/product-data.service';
import { EntityGroupService } from '../../../services/entity-group/entity-group-service.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { CompareService } from '../../../services/sort/sort.service';
import { DefectFilterService } from '../../../services/table/defect-filter.service';
import { PaginationService } from '../../../services/table/pagination.service';
import { SortService } from '../../../services/table/sort.service';
import { TableExportService } from '../../../services/table/table-export.service';
import { TableFilterService } from '../../../services/table/table-filter.service';
import { TreeService } from '../../../services/tree/tree.service';
import { DefectGroupWizardComponent } from './defect-group-wizard/defect-group-wizard.component';



@Component({
  selector: 'app-defect-groups',
  templateUrl: './defect-groups.component.html',
  styleUrls: ['./defect-groups.component.scss']
})
export class DefectGroupsComponent implements OnInit {
  title = "defectGroup.title";
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

  allChildrenItem = (_: number, _nodeData: TreeItemFlatNode<EntityGroupModel>) => _nodeData.item.children && _nodeData.item.children.length >0 && _nodeData.item.children.every(x => x.node.groupType == GroupTypes.Group || x.node.groupType == GroupTypes.Head);

  transformer = (node: TreeItem<EntityGroupModel>, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =existingNode && existingNode.item === node ? existingNode : new TreeItemFlatNode<EntityGroupModel>();
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
  constructor(private readonly entityGroupDataService: EntityGroupDataService,
    public readonly entityGroupService: EntityGroupService,
    private readonly dialog: MatDialog,
    private readonly snackBar: SnackbarService,
    public translate: TranslateService,
    public tableFilterService: TableFilterService,
    public compareService: CompareService,
    public sortService: SortService,
    private readonly confirmDialogService: ConfirmDialogService,
    public paginationService: PaginationService,) {
  }

  ngOnInit(): void {
    this.initalize(null);
  }
  initalize(expandedElement: TreeItemFlatNode<EntityGroupModel> | null) {
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
 

  addGroupFromNode() {
    let current: EntityGroupModel = {
      id: 0,
      name: '',
      order: 0,
      ppmGoal:0,
      translatedName: '',
      groupType: 0,
      parentId: 0,
      relations: new Array<EntityGroupRelationModel>(),
    }
    let tree = {
      node: current,
      children: new Array<any>(),
      collapsed: false,
    }
    let dialogRef = this.dialog.open(DefectGroupWizardComponent, {
      disableClose: true,
      autoFocus: false,
      data: tree,
      minWidth: '750px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.initalize(null);
      
    });
  }

  addToGroup(node: TreeItemFlatNode<EntityGroupModel>) {
    const currentNode = this.flatNodeMap.get(node);
    if (currentNode) {
      let current: EntityGroupModel = {
        id: 0,
        name: '',
        translatedName: '',
        groupType: 0,
        order: 0,
        ppmGoal: 0,
        parentId: currentNode.node.id,
        relations: new Array<EntityGroupRelationModel>(),
      }
      let tree = {
        node: current,
        children: new Array<any>(),
        collapsed: false,
      }
      if (currentNode) {
        let dialogRef = this.dialog.open(DefectGroupWizardComponent, {
          disableClose: true,
          autoFocus: false,
          data: tree,
          minWidth: '750px'
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.initalize(null);
          this.treeControl.expand(node);
        });
      }
    }
  }
  edit(node: TreeItemFlatNode<EntityGroupModel>) {
    const currentNode = this.flatNodeMap.get(node);
    if (currentNode) {
      let dialogRef = this.dialog.open(DefectGroupWizardComponent, {
        disableClose: true,
        autoFocus: false,
        data: currentNode,
        minWidth:'1400px'
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.initalize(node);
        this.treeControl.expand(node);
      });
    }
  }

  delete(node: TreeItemFlatNode<EntityGroupModel>) { 
    let message = node.item.node.groupType == GroupTypes.Group ? 'defectGroup.confirmDeleteGroup' : 'defectGroup.confirmDelete'
    this.confirmDialogService.openDeleteConfirm(message).subscribe(result => {
      if (result) {
        let request: DeleteEntityGroup = { id: node.item.node.id };
        this.entityGroupDataService.delete(request).subscribe(result => {
          this.snackBar.open(result);
          if (result) this.ngOnInit();
          this.treeControl.expand(node);
        });
      }
    });
  }
}
