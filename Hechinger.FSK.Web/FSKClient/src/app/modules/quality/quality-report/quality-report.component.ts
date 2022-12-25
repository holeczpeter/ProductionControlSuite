import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { EntityGroupModel, GetQuantityReportByProduct, IntervalModel, IntervalOption, QuantityOperationReportModel, SelectModel, Views } from '../../../models/generated/generated';
import { TreeItem } from '../../../models/tree-item';
import { EntityGroupDataService } from '../../../services/data/entity-group-data.service';
import { QualityDataService } from '../../../services/data/quality-data.service';
import { IntervalViewService } from '../../../services/interval-view/interval-view.service';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'app-quality-report',
  templateUrl: './quality-report.component.html',
  styleUrls: ['./quality-report.component.scss']
})
export class QualityReportComponent implements OnInit, OnDestroy {


  protected _onDestroy = new Subject<void>();
  dataSource: MatTableDataSource<any>;


  items: Array<TreeItem<EntityGroupModel>>;
  intervalOptions: Array<IntervalOption> = [
    { name: 'week', value: Views.Week, isDefault: true },
    { name: 'month', value: Views.Month, isDefault: false },
    { name: 'year', value: Views.Year, isDefault: false },
  ];
  currentDate = new Date();
  selectedView: Views;
  currentInterval: IntervalModel;
  intervalSubscription: Subscription;
  monthDataSubscription: Subscription;
  title = "defectgroups.title";
  constructor(private readonly qualityDataService: QualityDataService,
    public languageService: LanguageService,
    private readonly entityGroupDataService: EntityGroupDataService,
    private intervalPanelService: IntervalViewService) {
  }

  ngOnInit(): void {

    this.selectedView = this.intervalOptions.find(x => x.isDefault)!.value;
    if (this.monthDataSubscription) this.monthDataSubscription.unsubscribe();
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();
    this.intervalSubscription = this.intervalPanelService.getCurrentIntervalModel()
      .pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
      .subscribe((x: IntervalModel) => {
        this.currentInterval = x;
        this.selectedView = x.selectedView;

      });
    this.intervalPanelService.setViews(this.selectedView, this.currentDate);
    this.entityGroupDataService.getAll().subscribe(results => {  this.items = results; });
  }

  initalize() {
    if (this.currentInterval) {

    };
  }
  createDataSource() {

  }
  onSelect(event: EntityGroupModel) {
   
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
 
}

