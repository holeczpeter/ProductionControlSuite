import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NestedTreeControl } from '@angular/cdk/tree';
import { HttpParams } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { AccordionConfig } from '../../../../../layout/sidebar/sidebar.component';
import { EntityGroupModel, EntityGroupRelationModel, EntityGroupRelationTree, GroupTypes } from '../../../../../models/generated/generated';
import { TreeItem } from '../../../../../models/tree-item';
import { EntityGroupDataService } from '../../../../../services/data/entity-group-data.service';
import { LanguageService } from '../../../../../services/language/language.service';

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
  public get groupTypes(): typeof GroupTypes {
    return GroupTypes;
  }
  products: EntityGroupRelationModel[];
  operations: EntityGroupRelationModel[][];
  defects: EntityGroupRelationModel[][];
  treeControl = new NestedTreeControl<EntityGroupRelationTree>(node => node.children);
  dataSource = new MatTreeNestedDataSource<EntityGroupRelationTree>();
  hasChild = (_: number, node: EntityGroupRelationTree) => !!node.children && node.children.length > 0;
  constructor(private entityGroupDataService: EntityGroupDataService, public languageService: LanguageService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    console.log(this.tree)
    let params = new HttpParams();
    params = params.append('productIds', this.tree.node.relations.map(x => x.entityId.toString()).join(','));
    console.log(params);
    this.entityGroupDataService.getEntityRelationsByProducts(params).subscribe(res => {
     
      this.entityRelationTree = res;
      this.done.push(this.entityRelationTree[0].node);
      this.dataSource.data = this.entityRelationTree;
      this.createOpLists();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes["tree"]) this.initalize();
  }

  initalize() {
  }
  toggle(index: number) {
    console.log(this.config.multi)
    if (!this.config.multi) {
      this.entityRelationTree
        .filter((item, i) => i !== index && item.collapsed)
        .forEach(item => (item.collapsed = !item.collapsed));
    }
    this.entityRelationTree[index].collapsed = !this.entityRelationTree[index].collapsed;
  }
  drop(event: CdkDragDrop<EntityGroupRelationModel[]>) {
    console.log(event)
    if (event.previousContainer === event.container) {
      console.log(event.previousContainer)
      console.log(event.container)

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  
  createOpLists() {
    let allOp = this.entityRelationTree.flatMap(x => x.children);
    let a = this.groupBy(allOp, "order");
    //let result = allOp.reduce(function (r, a) {
    //  r[a.node.order] = r[a.node.order] || [];
    //  r[a.node.order].push(a);
    //     return r as EntityGroupRelationModel;
    //  }, Object.create(null));
    console.log(a);
    //this.entityRelationTree.forEach(x => {
    //  //this.products.push(x.node);
    //  let operations = x.children.map(i => i.node);
    //  let defects = x.children.flatMap(num => num.children);
    //  console.log(operations)
    //  console.log(defects)
    //});
  }
  groupBy(list: EntityGroupRelationTree[], keyGetter:any) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
 }

}
