import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class DefectGroupDefectEditorComponent implements OnInit {
  @Input() tree: TreeItem<EntityGroupModel>;
  @Output() refreshTree = new EventEmitter<any>();
  entityRelationTree: Array<EntityGroupRelationModel>;
  defects = new Array<EntityGroupRelationModel>();
  constructor(private entityGroupDataService: EntityGroupDataService,
    public languageService: LanguageService,
    private cdr: ChangeDetectorRef,
    private readonly confirmDialogService: ConfirmDialogService,
    private entityGroupService: EntityGroupService,
    private treeService: TreeService) { }

  ngOnInit(): void {
    this.entityGroupService.getCurrentTree().subscribe(x => {
      let list = new Array<string>();
      let node = this.treeService.getRelations(x, 1, 0);
      if (node) {
        node.children.forEach(child => {
          list = list.concat(child?.node.relations.map(x => x.entityId.toString()));
        });
      }
      let params = new HttpParams();
      params = params.append('operationIds', list.toString());
      params = params.append('groupId', this.tree.node.id);
  
      this.entityGroupDataService.getDefectsForRelation(params).subscribe(res => {
        this.defects = res;
      })
    });
    this.entityGroupService.refreshTree(this.tree);
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
    this.entityGroupService.refreshTree(this.tree);
  }
  addGroupFromNode(item: TreeItem<EntityGroupModel>) {
    let order = item.children.length+1;
    if (item) {
      let current: EntityGroupModel = {
        id: 0,
        name: '',
        translatedName: '',
        groupType: GroupTypes.Item,
        order: order,
        ppmGoal: 0,
        parentId: item.node.id,
        relations: new Array<EntityGroupRelationModel>(),
      }
      let tree = {
        node: current,
        children: new Array<any>(),
        collapsed: false,
      }
      item.children.push(tree);
      this.entityGroupService.refreshTree(this.tree);
    }
  }
  delete(parent: TreeItem<EntityGroupModel>, node: TreeItem<EntityGroupModel>) {
    this.confirmDialogService.openDeleteConfirm('hibacsoportot').subscribe(result => {
      if (result) {
        this.treeService.removeChild(parent, node);
        this.entityGroupService.refreshTree(this.tree);
      }
    });
   
  }
}
