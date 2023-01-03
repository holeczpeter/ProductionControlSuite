import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { EntityGroupModel } from '../../../../../../models/generated/generated';
import { TreeItem } from '../../../../../../models/tree-item';
import { ConfirmDialogService } from '../../../../../../services/confirm-dialog/confirm-dialog-service';
import { EntityGroupDataService } from '../../../../../../services/data/entity-group-data.service';
import { EntityGroupService } from '../../../../../../services/entity-group/entity-group-service.service';
import { LanguageService } from '../../../../../../services/language/language.service';
import { TreeService } from '../../../../../../services/tree/tree.service';


@Component({
  selector: 'app-defect-group-defect-child',
  templateUrl: './defect-group-defect-child.component.html',
  styleUrls: ['./defect-group-defect-child.component.scss']
})
export class DefectGroupDefectChildComponent implements OnInit {
  @Input() child: TreeItem<EntityGroupModel>;
  constructor(private entityGroupDataService: EntityGroupDataService,
    public languageService: LanguageService,
    private cdr: ChangeDetectorRef,
    private readonly confirmDialogService: ConfirmDialogService,
    private entityGroupService: EntityGroupService,
    private treeService: TreeService) { }

  ngOnInit(): void {
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
    this.child.node.name = event.container.data[0].name;
  }
}
