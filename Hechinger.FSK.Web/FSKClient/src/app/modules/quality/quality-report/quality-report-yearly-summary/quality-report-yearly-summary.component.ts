import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { GetGroupReport, GetGroupReportYearlySummary, GroupReportYearlySummaryModel, IntervalModel } from '../../../../models/generated/generated';
import { ProductDataService } from '../../../../services/data/product-data.service';
import { QualityDataService } from '../../../../services/data/quality-data.service';
import { IntervalViewService } from '../../../../services/interval-view/interval-view.service';
import { LanguageService } from '../../../../services/language/language.service';

export class QualityMonthlyTable {
  month: string;
  f0: number;
  f1: number;
  f2: number;
}

@Component({
  selector: 'app-quality-report-yearly-summary',
  templateUrl: './quality-report-yearly-summary.component.html',
  styleUrls: ['./quality-report-yearly-summary.component.scss']
})
export class QualityReportYearlySummaryComponent implements OnInit {
  @Input() request: GetGroupReport;
  @Input() interval: IntervalModel;
  results: Array<GroupReportYearlySummaryModel>;
  title = "qualityhistorymonthly.title";

  constructor(private readonly qualityDataService: QualityDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private intervalPanelService: IntervalViewService,
    private productDataService: ProductDataService,
    public languageService: LanguageService) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ((changes["request"] && this.request) || (changes["interval"] && this.interval)) this.initalize();
  }

  initalize() {
    if (this.interval && this.request) {
      let request: GetGroupReportYearlySummary = {
        entityGroupId: this.request.entityGroupId,
        year: this.interval.currentYear
      }
      this.qualityDataService.getGroupReportYearlySummary(request).subscribe(results => {
        this.results = results;
      });
    }
    
  }
  ngOnInit(): void {
  }
}

