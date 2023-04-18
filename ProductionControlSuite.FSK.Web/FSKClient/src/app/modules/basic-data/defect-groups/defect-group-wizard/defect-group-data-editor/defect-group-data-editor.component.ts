import { Component, OnInit, SimpleChanges } from '@angular/core';
import { EntityGroupService } from '../../../../../services/entity-group/entity-group-service.service';
import { LanguageService } from '../../../../../services/language/language.service';

@Component({
  selector: 'app-defect-group-data-editor',
  templateUrl: './defect-group-data-editor.component.html',
  styleUrls: ['./defect-group-data-editor.component.scss']
})
export class DefectGroupDataEditorComponent implements OnInit {
  constructor(public entityGroupService: EntityGroupService, public languageService: LanguageService) { }
  
  ngOnInit(): void {
    
  }
 
}
