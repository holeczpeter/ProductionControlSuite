import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
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
}
