import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { distinctUntilChanged } from 'rxjs';
import { EntityGroupModel, EntityGroupRelationModel, EntityGroupRelationTree, GroupTypes } from '../../../../../../models/generated/generated';
import { TreeItem } from '../../../../../../models/tree-item';
import { ConfirmDialogService } from '../../../../../../services/confirm-dialog/confirm-dialog-service';
import { EntityGroupDataService } from '../../../../../../services/data/entity-group-data.service';
import { EntityGroupService } from '../../../../../../services/entity-group/entity-group-service.service';
import { LanguageService } from '../../../../../../services/language/language.service';
import { TreeService } from '../../../../../../services/tree/tree.service';

@Component({
  selector: 'app-defect-group-defect-item',
  templateUrl: './defect-group-defect-item.component.html',
  styleUrls: ['./defect-group-defect-item.component.scss']
})
export class DefectGroupDefectItemComponent implements OnInit, OnChanges {
  @Input() item: TreeItem<EntityGroupModel>;
  @Output() refreshTree = new EventEmitter<any>();
  entityRelationTree: Array<EntityGroupRelationModel>;
  defects = new Array<EntityGroupRelationModel>();
  dataSource: MatTableDataSource<any>;
  columnsToDisplay = ['name', 'relation', 'delete'];
  expandedElement: TreeItem<EntityGroupModel> | null;

  constructor(private entityGroupDataService: EntityGroupDataService,
    public languageService: LanguageService,
    private readonly confirmDialogService: ConfirmDialogService,
    private entityGroupService: EntityGroupService,
    private treeService: TreeService) { }
    

  ngOnInit(): void {
    this.entityGroupService.getCurrentTree().subscribe(x => { console.log(x) })
  }
  ngOnChanges(changes: SimpleChanges): void {
    //console.log(this.item)
    if (changes["item"] && this.item) {
      this.dataSource = new MatTableDataSource(this.item.children);
      let list = new Array<string>();
      list = list.concat(this.item?.node.relations.map((x: any) => x.entityId.toString()));
      let params = new HttpParams();
      params = params.append('operationIds', list.toString());
      params = params.append('groupId', this.item.node.id);

      this.entityGroupDataService.getDefectsForRelation(params).subscribe(res => {
       // const difference = res.filter(x => !this.item?.node.relations.map((x: EntityGroupRelationModel) => x.entityId).includes(x.entityId);
        this.defects = res;
      })
    }
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
    this.entityGroupService.refreshTree(this.item);
  }
  addGroupFromNode(item: TreeItem<EntityGroupModel>) {
    let order = item.children.length + 1;
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

    }
  }
  delete(parent: TreeItem<EntityGroupModel>, node: TreeItem<EntityGroupModel>) {
    this.confirmDialogService.openDeleteConfirm('hibacsoportot').subscribe(result => {
      if (result) {
        this.treeService.removeChild(parent, node);
      }
    });

  }
}
