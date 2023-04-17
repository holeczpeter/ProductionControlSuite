import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GetGroupReport, GetGroupReportYearlySummary, GroupReportYearlySummaryModel, IntervalModel } from '../../../../models/generated/generated';
import { QualityDataService } from '../../../../services/data/quality-data.service';
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
export class QualityReportYearlySummaryComponent implements OnInit, OnDestroy {
  @Input() request: GetGroupReport;
  @Input() interval: IntervalModel;
  results: Array<GroupReportYearlySummaryModel>;
  title = "qualityhistorymonthly.title";
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly qualityDataService: QualityDataService,
    public languageService: LanguageService) {
  }

  ngOnInit(): void {
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
      this.qualityDataService.getGroupReportYearlySummary(request).pipe(takeUntil(this.destroy$)).subscribe(results => {
        this.results = results;
      });
    }
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

