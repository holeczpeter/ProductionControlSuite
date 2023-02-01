import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { EntityGroupModel, EntityGroupRelationModel, GroupTypes } from '../../../../../models/generated/generated';
import { TreeItem } from '../../../../../models/tree-item';
import { ConfirmDialogService } from '../../../../../services/confirm-dialog/confirm-dialog-service';
import { EntityGroupDataService } from '../../../../../services/data/entity-group-data.service';
import { EntityGroupService } from '../../../../../services/entity-group/entity-group-service.service';
import { LanguageService } from '../../../../../services/language/language.service';

@Component({
  selector: 'app-defect-group-defect-editor',
  templateUrl: './defect-group-defect-editor.component.html',
  styleUrls: ['./defect-group-defect-editor.component.scss']
})
export class DefectGroupDefectEditorComponent implements OnInit, OnChanges {
  @Input() tree: UntypedFormGroup;
  dataSource = new MatTableDataSource<AbstractControl<any>>();
  columnsToDisplay = ['name', 'relation', 'delete'];
  expandedElement: TreeItem<EntityGroupModel> | null;
  allDefects = new Array<EntityGroupRelationModel>();
  constructor(private readonly confirmDialogService: ConfirmDialogService,
    public entityGroupService: EntityGroupService,
    private entityGroupDataService: EntityGroupDataService,
    public languageService: LanguageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tree'] && this.tree) {
      this.entityGroupService.getOperationChanged().subscribe(change => {
        if (change) {
          this.entityGroupService.getAllDefectsBy(this.tree).subscribe(res => {
            this.allDefects = res
          });
          
        }
      });
      this.dataSource.data = this.entityGroupService.getChildrenByCurrentForm(this.tree).controls;
    }
  }
 
  ngOnInit(): void {
    
  }

  addGroupFromNode() {
    let current: EntityGroupModel = {
      id: 0,
      name: '',
      translatedName: '',
      order: 0,
      ppmGoal: 0,
      groupType: GroupTypes.DefectItem,
      parentId: this.tree.get('node')?.value.id,
      relations: new Array<EntityGroupRelationModel>(),
    }
    let tree = {
      node: current,
      children: new Array<any>(),
      collapsed: false,
    }
    this.entityGroupService.addChildToParent(this.tree, tree, GroupTypes.DefectItem);
    this.dataSource = new MatTableDataSource((this.entityGroupService.getChildrenByCurrentForm(this.tree) as FormArray).controls);
  }

  remove(i: number) {
    this.confirmDialogService.openDeleteConfirm('hibacsoportot').subscribe(result => {
      if (result) {
        this.entityGroupService.removeChildFromParent(this.tree, i);
        this.dataSource = new MatTableDataSource((this.entityGroupService.getChildrenByCurrentForm(this.tree) as FormArray).controls);
      }
    });
  }
}
