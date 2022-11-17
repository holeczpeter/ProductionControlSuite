import { Component, OnInit } from '@angular/core';
import { GetWorkshopPPmData, WorkshopPpmData } from '../../../models/generated/generated';
import { DashboardDataService } from '../../../services/data/dashboard-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = "welcome";
  workshopPpmList: Array<WorkshopPpmData>;
  constructor(private dashBoardDataService: DashboardDataService) { }

  ngOnInit(): void {
    let request: GetWorkshopPPmData = {
      startDate: new Date(2020,1,13),
      endDate: new Date(2020, 1, 19)
    }
    this.dashBoardDataService.getWorkshopPpmData(request).subscribe(results => {
      this.workshopPpmList = results;
    })
  }

}
