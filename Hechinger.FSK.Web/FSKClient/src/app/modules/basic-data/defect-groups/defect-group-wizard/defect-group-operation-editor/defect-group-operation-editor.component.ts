import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NestedTreeControl } from '@angular/cdk/tree';
import { HttpParams } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { AccordionConfig } from '../../../../../layout/sidebar/sidebar.component';
import { EntityGroupModel, EntityGroupRelationModel, EntityGroupRelationTree, GroupTypes } from '../../../../../models/generated/generated';
import { TreeItem } from '../../../../../models/tree-item';
import { ConfirmDialogService } from '../../../../../services/confirm-dialog/confirm-dialog-service';
import { EntityGroupDataService } from '../../../../../services/data/entity-group-data.service';
import { EntityGroupService } from '../../../../../services/entity-group/entity-group-service.service';
import { LanguageService } from '../../../../../services/language/language.service';
import { TreeService } from '../../../../../services/tree/tree.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-defect-group-operation-editor',
  templateUrl: './defect-group-operation-editor.component.html',
  styleUrls: ['./defect-group-operation-editor.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DefectGroupOperationEditorComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() tree: TreeItem<EntityGroupModel>;
  @Output() refreshTree = new EventEmitter<any>();
  entityRelationTree: Array<EntityGroupRelationModel>;
  config: AccordionConfig = { multi: false };
  done = new Array<EntityGroupRelationModel>();
  operations: EntityGroupRelationModel[];
  dataSource : MatTableDataSource<any>;
  columnsToDisplay = ['name', 'relation', 'delete', 'expand'];
  expandedElement: TreeItem<EntityGroupModel> | null;

  openedSidebar = true;
  constructor(private entityGroupDataService: EntityGroupDataService,
    public languageService: LanguageService,
    private cdr: ChangeDetectorRef,
    private readonly confirmDialogService: ConfirmDialogService,
    private entityGroupService: EntityGroupService,
    private treeService: TreeService) { }

  ngOnInit(): void {
    this.entityGroupService.getProductIds().subscribe(x => {
      this.dataSource = new MatTableDataSource(this.tree.children);
      let productIds = x.map(u => u.toString()).join(',');
      let params = new HttpParams();
      params = params.append('productIds', productIds);
      params = params.append('groupId', this.tree.node.id);
      this.entityGroupDataService.getOperationsForRelation(params).subscribe(res => {
        this.entityRelationTree = res;
        this.operations = this.entityRelationTree;
        //this.createChildren();
      })
    });
  }
  onToggleSidebar() {
    this.openedSidebar = !this.openedSidebar;

  }
  //createChildren() {
  //  if (this.operations) {
  //    let max = Math.max(...this.operations.map(x => Number(x.code.slice(-2))));
  //    console.log(max)
  //    for (var i = 1; i < max; i++) {
  //      let char = "0" + i.toString();
  //      let ops = this.operations.filter(x => x.code.slice(-2) == char);
  //      if (ops && ops.length > 0) {
  //        let currentRelations = new Array<EntityGroupRelationModel>();
  //        ops.forEach(op => {
  //          currentRelations.push(op);
  //        });

  //        let current: EntityGroupModel = {
  //          id: 0,
  //          name: ops[0] != null ? ops[0].name : "",
  //          translatedName: ops[0] != null ? ops[0].translatedName : "",
  //          order: i,
  //          ppmGoal: 0,
  //          groupType: GroupTypes.Item,
  //          parentId: this.tree.node.id,
  //          relations: currentRelations,
  //        }
  //        let tree = {
  //          node: current,
  //          children: new Array<any>(),
  //          collapsed: false,
  //        }
  //        this.treeService.addChild(this.tree, tree);
  //      }
  //    }
  //  }
    
  //}

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
  
  }

  delete(node: TreeItem<EntityGroupModel>) {
    this.confirmDialogService.openDeleteConfirm('műveletcsoportot').subscribe(result => {
      if (result) {
        this.tree = this.treeService.removeChild(this.tree, node);
        this.dataSource = new MatTableDataSource(this.tree.children);
      }
    });
  }
  
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
