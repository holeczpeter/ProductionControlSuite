import { Component, OnInit } from '@angular/core';
import { DefectGroupContextService } from '../../../../../services/defectgroupcontext/defect-group-context.service';

@Component({
  selector: 'app-defect-group-data-editor',
  templateUrl: './defect-group-data-editor.component.html',
  styleUrls: ['./defect-group-data-editor.component.scss']
})
export class DefectGroupDataEditorComponent implements OnInit {

  constructor(public defectGroupContextService: DefectGroupContextService) { }

  ngOnInit(): void {
  }

}
