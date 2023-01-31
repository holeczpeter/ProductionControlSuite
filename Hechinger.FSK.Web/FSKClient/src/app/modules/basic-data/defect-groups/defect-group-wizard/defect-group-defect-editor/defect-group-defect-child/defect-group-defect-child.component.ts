import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
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
  }
}
