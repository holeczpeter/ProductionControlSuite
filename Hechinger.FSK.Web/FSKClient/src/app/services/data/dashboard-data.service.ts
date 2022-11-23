import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardCrapCost, GetDashboardCrapCost, GetProductionInformation, GetWorkshopPPmData, ProductionInfo, WorkshopPpmData } from '../../models/generated/generated';

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
  getWorkshopPpmData(request: GetWorkshopPPmData): Observable<Array<WorkshopPpmData>> {
    return this.httpClient.get<Array<WorkshopPpmData>>('/Dashboard/GetWorkshopPpmData',
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
