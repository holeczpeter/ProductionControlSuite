import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BehaviorSubject, distinctUntilChanged, Subject, Subscription, takeUntil } from 'rxjs';
import { EntityGroupModel, GetGroupReport, GroupTypes, IntervalModel, IntervalOption, Views } from '../../../models/generated/generated';
import { TreeItem } from '../../../models/tree-item';
import { EntityGroupDataService } from '../../../services/data/entity-group-data.service';
import { EntityGroupService } from '../../../services/entity-group/entity-group-service.service';
import { IntervalViewService } from '../../../services/interval-view/interval-view.service';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'app-quality-report',
  templateUrl: './quality-report.component.html',
  styleUrls: ['./quality-report.component.scss']
})
export class QualityReportComponent implements OnInit, OnDestroy {
  
  dataSource: MatTableDataSource<any>;
  request: GetGroupReport;
  items: Array<TreeItem<EntityGroupModel>>;
  intervalOptions: Array<IntervalOption> = [
    { name: 'month', value: Views.Month, isDefault: true },
    { name: 'year', value: Views.Year, isDefault: false },
  ];
  public get groupTypes(): typeof GroupTypes {
    return GroupTypes;
  }
  currentDate = new Date();
  selectedView: Views;
  currentInterval: IntervalModel;
  intervalSubscription: Subscription;
  monthDataSubscription: Subscription;
  title = "defectGroup.title";
  entityGroupId = new BehaviorSubject<number>(0);
  private destroy$: Subject<void> = new Subject<void>();

  constructor(public readonly entityGroupService: EntityGroupService,
    public languageService: LanguageService,
    private readonly entityGroupDataService: EntityGroupDataService,
    private intervalPanelService: IntervalViewService) {
  }

  ngOnInit(): void {
    this.selectedView = this.intervalOptions.find(x => x.isDefault)!.value;
    if (this.monthDataSubscription) this.monthDataSubscription.unsubscribe();
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();
    this.intervalSubscription = this.intervalPanelService.getCurrentIntervalModel()
      .pipe(takeUntil(this.destroy$),distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
      .subscribe((x: IntervalModel) => {
        this.currentInterval = x;
        this.selectedView = x.selectedView;
        if (this.entityGroupId.getValue() != 0) {
          this.request = { entityGroupId: this.entityGroupId.getValue(), startDate: this.currentInterval.startDate, endDate: this.currentInterval.endDate, view: this.currentInterval.selectedView }
        }
        
      });
    this.entityGroupId.subscribe(x => {
      if (this.currentInterval) {
        this.request = { entityGroupId: this.entityGroupId.getValue(), startDate: this.currentInterval.startDate, endDate: this.currentInterval.endDate, view: this.currentInterval.selectedView  }
      }
     
    });
    this.intervalPanelService.setViews(this.selectedView, this.currentDate);
    this.entityGroupDataService.getAll().pipe(takeUntil(this.destroy$)).subscribe(results => { this.items = results;});
  }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if (tabChangeEvent.index) {
      this.intervalPanelService.setViews(Views.Year, this.currentDate);
    }
  }
 
  hasChildren(item: TreeItem<EntityGroupModel>) {
    return item.children &&
      item.children.length > 0 &&
      item.children.some(x => x.node.groupType == GroupTypes.Group || x.node.groupType == GroupTypes.Head);
  }
  
  onSelect(event: EntityGroupModel) {
    this.entityGroupId.next(event.id);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.entityGroupId.next(0);
    this.entityGroupId.complete();
  }
 
}

