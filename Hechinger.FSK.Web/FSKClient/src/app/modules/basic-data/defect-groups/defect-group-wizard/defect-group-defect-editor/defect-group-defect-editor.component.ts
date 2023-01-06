import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EntityGroupModel, EntityGroupRelationModel, EntityGroupRelationTree, GroupTypes } from '../../../../../models/generated/generated';
import { TreeItem } from '../../../../../models/tree-item';
import { ConfirmDialogService } from '../../../../../services/confirm-dialog/confirm-dialog-service';
import { EntityGroupDataService } from '../../../../../services/data/entity-group-data.service';
import { EntityGroupService } from '../../../../../services/entity-group/entity-group-service.service';
import { LanguageService } from '../../../../../services/language/language.service';
import { TreeService } from '../../../../../services/tree/tree.service';

@Component({
  selector: 'app-defect-group-defect-editor',
  templateUrl: './defect-group-defect-editor.component.html',
  styleUrls: ['./defect-group-defect-editor.component.scss']
})
export class DefectGroupDefectEditorComponent implements OnInit, OnChanges {
  @Input() tree: TreeItem<EntityGroupModel>;
  @Output() refreshTree = new EventEmitter<any>();
  dataSource: MatTableDataSource<any>;
  columnsToDisplay = ['name', 'relation', 'delete'];
  expandedElement: TreeItem<EntityGroupModel> | null;
  defects = new Array<EntityGroupRelationModel>();
  constructor(private entityGroupDataService: EntityGroupDataService,

    private readonly confirmDialogService: ConfirmDialogService,
    private entityGroupService: EntityGroupService,
    private treeService: TreeService,
    public languageService: LanguageService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["tree"] && this.tree) {
      this.dataSource = new MatTableDataSource(this.tree.children);
      let list = new Array<string>();
      list = list.concat(this.tree?.node.relations.map((x: any) => x.entityId.toString()));
      let params = new HttpParams();
      params = params.append('operationIds', list.toString());
      params = params.append('groupId', this.tree.node.id);

      this.entityGroupDataService.getDefectsForRelation(params).subscribe(res => {
        // const difference = res.filter(x => !this.item?.node.relations.map((x: EntityGroupRelationModel) => x.entityId).includes(x.entityId);
        this.defects = res;
      })
    }
      this.dataSource = new MatTableDataSource(this.tree.children);
    }

  ngOnInit(): void {
    
  }
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  addGroupFromNode() {
    let current: EntityGroupModel = {
      id: 0,
      name: '',
      translatedName: '',
      order: 0,
      ppmGoal: 0,
      groupType: GroupTypes.Item,
      parentId: this.tree.node.id,
      relations: new Array<EntityGroupRelationModel>(),
    }
    let tree = {
      node: current,
      children: new Array<any>(),
      collapsed: false,
    }
    this.treeService.addChild(this.tree, tree);
    this.dataSource = new MatTableDataSource(this.tree.children);
    let order = tree.children.length + 1;
    
  }
  delete(node: TreeItem<EntityGroupModel>) {
    this.confirmDialogService.openDeleteConfirm('hibacsoportot').subscribe(result => {
      if (result) {
        this.treeService.removeChild(this.tree, node);
        this.dataSource = new MatTableDataSource(this.tree.children);
      }
    });
  }
}
