import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NestedTreeControl } from '@angular/cdk/tree';
import { HttpParams } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { AccordionConfig } from '../../../../../layout/sidebar/sidebar.component';
import { EntityGroupModel, EntityGroupRelationModel, EntityGroupRelationTree, GroupTypes } from '../../../../../models/generated/generated';
import { TreeItem } from '../../../../../models/tree-item';
import { EntityGroupDataService } from '../../../../../services/data/entity-group-data.service';
import { EntityGroupService } from '../../../../../services/entity-group/entity-group-service.service';
import { LanguageService } from '../../../../../services/language/language.service';
import { TreeService } from '../../../../../services/tree/tree.service';

@Component({
  selector: 'app-defect-group-operation-editor',
  templateUrl: './defect-group-operation-editor.component.html',
  styleUrls: ['./defect-group-operation-editor.component.scss']
})
export class DefectGroupOperationEditorComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() tree: TreeItem<EntityGroupModel>;
  @Output() refreshTree = new EventEmitter<any>();
  entityRelationTree: Array<EntityGroupRelationModel>;
  config: AccordionConfig = { multi: false };
  done = new Array<EntityGroupRelationModel>();
  operations: EntityGroupRelationModel[];

  constructor(private entityGroupDataService: EntityGroupDataService,
    public languageService: LanguageService,
    private cdr: ChangeDetectorRef,
    private entityGroupService: EntityGroupService,
    private treeService: TreeService) { }

  ngOnInit(): void {
    this.entityGroupService.getProductIds().subscribe(x => {
      let productIds = x.map(u => u.toString()).join(',');
      let params = new HttpParams();
      params = params.append('productIds', productIds);
      params = params.append('groupId', this.tree.node.id);
      this.entityGroupDataService.getOperationsForRelation(params).subscribe(res => {
        this.entityRelationTree = res;
        this.operations = this.entityRelationTree;
      })
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
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
    this.entityGroupService.refreshTree(this.tree);
  }

  delete(node: TreeItem<EntityGroupModel>) {
    this.tree = this.treeService.removeChild(this.tree, node);
    this.entityGroupService.refreshTree(this.tree);
  }
  
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
