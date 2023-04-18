import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { GetGroupReport, GroupReportModel, IntervalModel, Views } from '../../../../models/generated/generated';
import { QuantityTableModel } from '../../../../models/quantity-table-model';
import { QualityDataService } from '../../../../services/data/quality-data.service';
import { LanguageService } from '../../../../services/language/language.service';
export interface Quality {
  tableModel: QuantityTableModel;
  chartTitle: string;
}

@Component({
  selector: 'app-quality-group-report',
  templateUrl: './quality-group-report.component.html',
  styleUrls: ['./quality-group-report.component.scss']
})
export class QualityGroupReportComponent implements OnInit, OnChanges, OnDestroy {
  @Input() request: GetGroupReport;
  @Input() interval: IntervalModel;
  selectedView: Views;
  result: GroupReportModel;
  items: Array<Quality>;
  public get views(): typeof Views {
    return Views;
  }
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly qualityDataService: QualityDataService,
    public languageService: LanguageService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes["request"] && this.request) || (changes["interval"] && this.interval)) this.initalize();
  }

  initalize() {
    this.selectedView = this.interval.selectedView;
    if (this.interval && this.request) {
      forkJoin([this.qualityDataService.getGroupReport(this.request)]).pipe(takeUntil(this.destroy$)).subscribe(([result]) => {
        this.result = result;
      });
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
