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
  
  constructor(
    public languageService: LanguageService) { }

  ngOnInit(): void {
    
  }
}
