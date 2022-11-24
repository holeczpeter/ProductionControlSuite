import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardWorkshopCrapCost, DashboardWorkshopPpm, GetDashboardWorkshopCrapCost, GetDashboardWorkshopPpm, GetPpmWarnings, GetWorkshopProduction, GetWorkshopUserStats, PpmWarning, WorkshopProduction, WorkshopProductionChartModel, WorkshopUserInfo } from '../../models/generated/generated';


@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {

  constructor(private readonly httpClient: HttpClient) { }

  getPpmWarnings(request: GetPpmWarnings): Observable<Array<PpmWarning>> {
    return this.httpClient.get<Array<PpmWarning>>('/Dashboard/GetPpmWarnings',
      {
        params: {
          'startDate': request.startDate.toDateString(),
          'endDate': request.endDate.toDateString()
        }
      });
  }
  
  getWorkshopUserStats(request: GetWorkshopUserStats): Observable<Array<WorkshopUserInfo>> {
    return this.httpClient.get<Array<WorkshopUserInfo>>('/Dashboard/GetWorkshopUserStats');
    
  }

  getProductionInfo(request: GetWorkshopProduction): Observable<Array<WorkshopProduction>> {
    return this.httpClient.get<Array<WorkshopProduction>>('/Dashboard/GetWorkshopProduction',
      {
        params: {
          'startDate': request.startDate.toDateString(),
          'endDate': request.endDate.toDateString()
        }
      });
  }

  getDashboardPpm(request: GetDashboardWorkshopPpm): Observable<Array<DashboardWorkshopPpm>> {
    return this.httpClient.get<Array<DashboardWorkshopPpm>>('/Dashboard/GetDashboardWorkshopPpm',
      {
        params: {
          'startDate': request.startDate.toDateString(),
          'endDate': request.endDate.toDateString()
        }
      });
  }

  getDashboardCrapCost(request: GetDashboardWorkshopCrapCost): Observable<Array<DashboardWorkshopCrapCost>> {
    return this.httpClient.get<Array<DashboardWorkshopCrapCost>>('/Dashboard/GetDashboardWorkshopCrapCost',
      {
        params: {
          'startDate': request.startDate.toDateString(),
          'endDate': request.endDate.toDateString()
        }
      });
  }
}
