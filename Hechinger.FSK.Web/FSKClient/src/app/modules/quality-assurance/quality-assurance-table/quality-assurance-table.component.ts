import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { IntervalModel, IntervalOption, Views } from '../../../models/generated';
import { QualityAssuranceDataService } from '../../../services/data/quality-assurance-data.service';
import { IntervalViewService } from '../../../services/interval-view/interval-view.service';
import { ResultBuilder } from '../../../services/result/result-builder';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

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
  constructor(private readonly intervalPanelService: IntervalViewService,
    private qualityDataService: QualityAssuranceDataService,
    private readonly snackBar: SnackbarService) { }

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
  onImport() {
    this.qualityDataService.import().subscribe(x => {
      this.snackBar.open(new ResultBuilder().setMessage('Kész').setSuccess(x).build())
    });
  }
}
