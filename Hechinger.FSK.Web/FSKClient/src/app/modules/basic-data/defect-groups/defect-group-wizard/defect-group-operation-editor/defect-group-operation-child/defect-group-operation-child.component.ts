import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { EntityGroupRelationModel } from '../../../../../../models/generated/generated';
import { EntityGroupService } from '../../../../../../services/entity-group/entity-group-service.service';
import { LanguageService } from '../../../../../../services/language/language.service';

@Component({
  selector: 'app-defect-group-operation-child',
  templateUrl: './defect-group-operation-child.component.html',
  styleUrls: ['./defect-group-operation-child.component.scss']
})
export class DefectGroupOperationChildComponent implements OnInit, OnChanges {
  @Input() item: UntypedFormGroup;
  constructor(public languageService: LanguageService,
    public entityGroupService: EntityGroupService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
  delete(index: number) {
    this.entityGroupService.removeRelationToParent(this.item, index);
    const allUsed = this.entityGroupService.getAllOperationRelation();
    const difference = this.entityGroupService.allOperations.filter(x => !allUsed.map((x: EntityGroupRelationModel) => x.entityId).includes(x.entityId));
    this.entityGroupService.selectableOperations = difference;
    this.entityGroupService.operationChangedSubject.next(true);
    
  }
}
