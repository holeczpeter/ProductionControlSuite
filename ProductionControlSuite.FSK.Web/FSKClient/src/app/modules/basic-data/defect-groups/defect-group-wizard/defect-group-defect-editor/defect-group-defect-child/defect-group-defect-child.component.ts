import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { EntityGroupRelationModel } from '../../../../../../models/generated/generated';
import { EntityGroupService } from '../../../../../../services/entity-group/entity-group-service.service';
import { LanguageService } from '../../../../../../services/language/language.service';


@Component({
  selector: 'app-defect-group-defect-child',
  templateUrl: './defect-group-defect-child.component.html',
  styleUrls: ['./defect-group-defect-child.component.scss']
})
export class DefectGroupDefectChildComponent implements OnInit, OnChanges {
  @Input() item: UntypedFormGroup;
  constructor(public entityGroupService: EntityGroupService,
    public languageService: LanguageService) { }
   

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  delete(index: number) {
    this.entityGroupService.removeRelationToParent(this.item, index);
    this.entityGroupService.operationChangedSubject.next(true);
    //const allUsed = this.entityGroupService.getAllDefectRelation(this.item);
    //this.entityGroupService.getAllDefectsBy(this.item).subscribe(x => {

    //});
    //const difference = this.entityGroupService.allOperations.filter(x => !allUsed.map((x: EntityGroupRelationModel) => x.entityId).includes(x.entityId));
    //this.entityGroupService.selectableOperations = difference;
    //refreshDefectsList
  }
}
