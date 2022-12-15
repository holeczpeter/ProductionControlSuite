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
  entityRelationTree: Array<EntityGroupRelationTree>;
  config: AccordionConfig = { multi: false };
  done = new Array<EntityGroupRelationModel>();
  operations: EntityGroupRelationModel[];
  public get groupTypes(): typeof GroupTypes {
    return GroupTypes;
  }

  treeControl = new NestedTreeControl<EntityGroupRelationTree>(node => node.children);
  dataSource = new MatTreeNestedDataSource<EntityGroupRelationTree>();
  hasChild = (_: number, node: EntityGroupRelationTree) => !!node.children && node.children.length > 0;
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
      this.entityGroupDataService.getEntityRelationsByProducts(params).subscribe(res => {
        this.entityRelationTree = res;
        this.dataSource.data = this.entityRelationTree;
        this.createOpList();

      })
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes && changes["tree"] && this.tree) this.initalize();
  }

  initalize() {
   
    //let productIds = "";
    //if (this.tree.node.relations && this.tree.node.relations.length > 0) {
    //  productIds = this.tree.node.relations.map(x => x.entityId.toString()).join(',');
    //}
   
    //let params = new HttpParams();
    //params = params.append('productIds', productIds);
    //this.entityGroupDataService.getEntityRelationsByProducts(params).subscribe(res => {
    //  this.entityRelationTree = res;
    //  this.dataSource.data = this.entityRelationTree;
    //  this.createOpList();

    //})
  }

  
  drop(event: CdkDragDrop<any[]>) {
    console.log(event)
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
  
  addGroupFromNode() {
    let current: EntityGroupModel = {
      id: 0,
      name: '',
      translatedName: '',
      groupType: GroupTypes.Item,
      parentId: this.tree.node.id,
      relations: new Array<EntityGroupRelationModel>(),
    }
    let tree = {
      node: current,
      children: new Array<any>(),
      collapsed: false,
    }
    this.tree.children.push(tree);
  }
  delete(node: TreeItem<EntityGroupModel>) {
    this.tree = this.treeService.removeChild(this.tree, node);
    console.log(this.tree)
  }
  createOpList() {
    this.operations = this.entityRelationTree.flatMap(x => x.children).map(i => i.node);
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
