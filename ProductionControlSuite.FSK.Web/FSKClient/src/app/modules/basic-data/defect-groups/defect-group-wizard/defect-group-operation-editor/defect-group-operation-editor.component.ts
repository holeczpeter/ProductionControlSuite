import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpParams } from '@angular/common/http';
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { startWith, Subject, takeUntil } from 'rxjs';
import { AccordionConfig } from '../../../../../layout/sidebar/sidebar.component';
import { EntityGroupModel, EntityGroupRelationModel, GroupTypes } from '../../../../../models/generated/generated';
import { TreeItem } from '../../../../../models/tree-item';
import { ConfirmDialogService } from '../../../../../services/confirm-dialog/confirm-dialog-service';
import { EntityGroupDataService } from '../../../../../services/data/entity-group-data.service';
import { EntityGroupService } from '../../../../../services/entity-group/entity-group-service.service';
import { LanguageService } from '../../../../../services/language/language.service';


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
export class DefectGroupOperationEditorComponent implements OnInit, OnChanges, AfterViewInit, AfterContentChecked, OnDestroy {
  
 
  config: AccordionConfig = { multi: false };
  done = new Array<EntityGroupRelationModel>();
  dataSource = new  MatTableDataSource<any>();
  columnsToDisplay = ['order','name', 'relation', 'delete', 'expand'];
  expandedElement: TreeItem<EntityGroupModel> | null;
  openedSidebar = true;
  protected onDestroy$ = new Subject<void>();

  constructor(private entityGroupDataService: EntityGroupDataService,
    public languageService: LanguageService,
    private changeDetector: ChangeDetectorRef,
    private readonly confirmDialogService: ConfirmDialogService,
    public entityGroupService: EntityGroupService) { }
    

  ngOnInit(): void {
    this.entityGroupService.treeForm.valueChanges.pipe(takeUntil(this.onDestroy$) ,startWith(this.entityGroupService.treeForm.value)).subscribe(x => {
      this.dataSource.data = this.entityGroupService.getChildren.controls;
    });
    this.entityGroupService.getProductChanged().pipe(takeUntil(this.onDestroy$) ,startWith(true)).subscribe(change => {
      if (change) {
        let products = this.entityGroupService.getRelations.value;
        let productIds = products.map((x: EntityGroupRelationModel) => x.entityId).map((u: number) => u.toString()).join(',');
        let params = new HttpParams();
        params = params.append('productIds', productIds);
        params = params.append('groupId', this.entityGroupService.treeForm.get('node')?.value.id);
        this.entityGroupDataService.getOperationsForRelation(params).pipe(takeUntil(this.onDestroy$)).subscribe(res => {
          if (res == null) res = new Array<EntityGroupRelationModel>();
          this.entityGroupService.allOperations = res;
          const allUsed = this.entityGroupService.getAllOperationRelation();
          const difference = this.entityGroupService.allOperations.filter(x => !allUsed.map((x: EntityGroupRelationModel) => x.entityId).includes(x.entityId));
          this.entityGroupService.selectableOperations = difference;
        })
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  onToggleSidebar() {
    this.openedSidebar = !this.openedSidebar;
  }

  addGroupFromNode() {
    let current: EntityGroupModel = {
      id: 0,
      name: '',
      translatedName: '',
      order: 0,
      ppmGoal: 0,
      groupType: GroupTypes.OperationItem,
      parentId: this.entityGroupService.treeForm.get('node')?.value.id,
      relations: new Array<EntityGroupRelationModel>(),
    }
    let tree = {
      node: current,
      children: new Array<any>(),
      collapsed: false,
    }
    this.entityGroupService.addChildToParent(this.entityGroupService.treeForm, tree, GroupTypes.OperationItem);
   
  }
  remove(i: number) {
    this.confirmDialogService.openDeleteConfirm('defectGroup.confirmDeleteOperationGroup').subscribe(result => {
      if (result) {
        this.entityGroupService.removeChildFromParent(this.entityGroupService.treeForm,i);
      }
    });
  }
  ngAfterContentChecked() {
    this.changeDetector.detectChanges();
  }
  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }
  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}

