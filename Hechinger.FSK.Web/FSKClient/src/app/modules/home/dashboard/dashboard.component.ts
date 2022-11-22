import { Component, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { GetWorkshopPPmData, IntervalModel, IntervalOption, Views, WorkshopPpmData } from '../../../models/generated/generated';
import { WorkshopPpmModel } from '../../../models/workshop-ppm-model';
import { DashboardDataService } from '../../../services/data/dashboard-data.service';
import { IntervalViewService } from '../../../services/interval-view/interval-view.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  title = "welcome";
  workshopPpmModel: WorkshopPpmModel;
  currentInterval: IntervalModel;
  intervalOptions: Array<IntervalOption> = [
    { name: 'week', value: Views.Week, isDefault: true },
  ];
  currentDate = new Date();
  selectedView: Views;
  intervalSubscription: Subscription;
  constructor(private dashBoardDataService: DashboardDataService,
    private readonly intervalPanelService: IntervalViewService) {
    this.selectedView = this.intervalOptions.find(x => x.isDefault)!.value;
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();
    this.intervalSubscription = this.intervalPanelService.getCurrentIntervalModel()
      .pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
      .subscribe((x: IntervalModel) => {
        this.currentInterval = x;
        this.selectedView = x.selectedView;
        this.createChart();
      });
    this.intervalPanelService.setViews(this.selectedView, new Date(2022,2,1));

  }
  createChart() {
    let request: GetWorkshopPPmData = {
      startDate: this.currentInterval.startDate,
      endDate: this.currentInterval.endDate,
    }
    this.dashBoardDataService.getWorkshopPpmData(request).subscribe(results => {
      this.workshopPpmModel = { items: results, interval: this.currentInterval }
     
    })
  }
  ngOnInit(): void {
   
  }
  ngOnDestroy() {
    
    if (this.intervalSubscription) this.intervalSubscription.unsubscribe();
  }
}
