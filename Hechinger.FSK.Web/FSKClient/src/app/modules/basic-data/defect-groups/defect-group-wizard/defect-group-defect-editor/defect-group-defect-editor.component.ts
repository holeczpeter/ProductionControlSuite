import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityGroupModel, EntityGroupRelationModel, EntityGroupRelationTree, GroupTypes } from '../../../../../models/generated/generated';
import { TreeItem } from '../../../../../models/tree-item';
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
    private entityGroupService: EntityGroupService,
    private treeService: TreeService) { }

  ngOnInit(): void {
    this.entityGroupService.getCurrentTree().subscribe(x => {
      let node = this.treeService.getRelations(x, 2, 0);
      console.log(node)
      let operationIds = "";
      if (node) {
        operationIds = node?.node.relations.map(x => x.entityId.toString()).join(',');
      }
      
      let params = new HttpParams();
      params = params.append('operationIds', operationIds);
      params = params.append('groupId', this.tree.node.id);
      console.log(params)
      this.entityGroupDataService.getDefectsForRelation(params).subscribe(res => {
        console.log(res)
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
    console.log(this.tree)
  }
  addGroupFromNode(item: TreeItem<EntityGroupModel>) {
    if (item) {
      let current: EntityGroupModel = {
        id: 0,
        name: '',
        translatedName: '',
        groupType: GroupTypes.Item,
        parentId: item.node.id,
        relations: new Array<EntityGroupRelationModel>(),
      }
      let tree = {
        node: current,
        children: new Array<any>(),
        collapsed: false,
      }
      item.children.push(tree);
     
    }
  }
  delete(parent: TreeItem<EntityGroupModel>, node: TreeItem<EntityGroupModel>) {
    this.treeService.removeChild(parent, node);
  }
}
