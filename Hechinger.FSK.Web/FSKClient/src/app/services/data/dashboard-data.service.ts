import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardCrapCost, DashboardPpm, GetDashboardCrapCost, GetDashboardPpm, GetProductionInformation, ProductionInfo } from '../../models/generated/generated';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {

  constructor(private readonly httpClient: HttpClient) { }

  getProductionInfo(request: GetProductionInformation): Observable<Array<ProductionInfo>> {
    return this.httpClient.get<Array<ProductionInfo>>('/Dashboard/GetProductionInformation',
      {
        params: {
          'startDate': request.startDate.toDateString(),
          'endDate': request.endDate.toDateString()
        }
      });
  }
  getWorkshopPpmData(request: GetDashboardPpm): Observable<Array<DashboardPpm>> {
    return this.httpClient.get<Array<DashboardPpm>>('/Dashboard/GetWorkshopPpmData',
      {
        params: {
          'startDate': request.startDate.toDateString(),
          'endDate': request.endDate.toDateString()
        }
      });
  }
  getDashboardCrapCost(request: GetDashboardCrapCost): Observable<Array<DashboardCrapCost>> {
    return this.httpClient.get<Array<DashboardCrapCost>>('/Dashboard/GetDashboardCrapCost',
      {
        params: {
          'startDate': request.startDate.toDateString(),
          'endDate': request.endDate.toDateString()
        }
      });
  }
}
