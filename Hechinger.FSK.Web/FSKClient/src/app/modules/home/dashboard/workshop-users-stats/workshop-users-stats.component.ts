import { Component, DoCheck, Input, IterableDiffer, IterableDiffers, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { WorkshopUserInfo } from '../../../../models/generated/generated';
import { DashboardDataService } from '../../../../services/data/dashboard-data.service';


@Component({
  selector: 'app-workshop-users-stats',
  templateUrl: './workshop-users-stats.component.html',
  styleUrls: ['./workshop-users-stats.component.scss']
})
export class WorkshopUsersStatsComponent implements OnInit ,DoCheck {
  @Input() workshopUserStats: Array<WorkshopUserInfo>;
  displayedColumns: string[] = ['workshopName', 'count'];
  dataSource : MatTableDataSource<WorkshopUserInfo>;
  private _differ: IterableDiffer<any>;
  constructor(private dashBoardDataService: DashboardDataService,
    public translateService: TranslateService,
    private differs: IterableDiffers) {
    this._differ = this.differs.find([]).create();
  }
 

  ngOnInit(): void {

  }
  ngDoCheck() {
    var changes = this._differ.diff(this.workshopUserStats);
    if (changes) {
      this.dataSource = new MatTableDataSource(this.workshopUserStats);
    }
  }
}
