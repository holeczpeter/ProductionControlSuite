import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { IntervalModel, IntervalOption, Views } from '../../../models/generated';
import { IntervalViewService } from '../../../services/interval-view/interval-view.service';

@Component({
  selector: 'app-quality-assurance-table',
  templateUrl: './quality-assurance-table.component.html',
  styleUrls: ['./quality-assurance-table.component.scss']
})
export class QualityAssuranceTableComponent implements OnInit {
  intervalOptions: Array<IntervalOption> = [
    { name: 'Hét', value: Views.Week, isDefault: false},
    { name: 'Hónap', value: Views.Month, isDefault: true},
    { name: 'Év', value: Views.Year, isDefault: false},
  ];
  currentDate = new Date();
  selectedView: Views;
  currentInterval: IntervalModel;
  intervalSubscription: Subscription;
  constructor(private readonly intervalPanelService: IntervalViewService) { }

  ngOnInit(): void {

    this.selectedView = this.intervalOptions.find(x => x.isDefault)!.value;
    this.intervalSubscription = this.intervalPanelService.getCurrentIntervalModel()
      .pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)))
      .subscribe((x: IntervalModel) => {
        this.currentInterval = x;
        this.selectedView = x.selectedView;
        
      });
    this.intervalPanelService.setViews(this.selectedView, this.currentDate);
  }

}
