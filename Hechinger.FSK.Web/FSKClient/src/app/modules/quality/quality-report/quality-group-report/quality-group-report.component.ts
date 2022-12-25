import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { GetGroupReport, IntervalModel } from '../../../../models/generated/generated';
import { ProductDataService } from '../../../../services/data/product-data.service';
import { QualityDataService } from '../../../../services/data/quality-data.service';
import { IntervalViewService } from '../../../../services/interval-view/interval-view.service';
import { LanguageService } from '../../../../services/language/language.service';

@Component({
  selector: 'app-quality-group-report',
  templateUrl: './quality-group-report.component.html',
  styleUrls: ['./quality-group-report.component.scss']
})
export class QualityGroupReportComponent implements OnInit, OnChanges {
  @Input() request: GetGroupReport;

  constructor(private readonly qualityDataService: QualityDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private intervalPanelService: IntervalViewService,
    private productDataService: ProductDataService,
    public languageService: LanguageService) { }
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["request"] && this.request) this.initalize();
      
  }
  initalize() {
    
    this.qualityDataService.getGroupReport(this.request).subscribe(result => {
      console.log(this.request);
      console.log(result);
    })
  }
}
