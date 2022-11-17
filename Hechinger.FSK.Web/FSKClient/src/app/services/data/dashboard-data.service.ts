import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetWorkshopPPmData, WorkshopPpmData } from '../../models/generated/generated';

@Injectable({
  providedIn: 'root'
})
export class DashboardDataService {

  constructor(private readonly httpClient: HttpClient) { }

  
  getWorkshopPpmData(request: GetWorkshopPPmData): Observable<Array<WorkshopPpmData>> {
    return this.httpClient.get<Array<WorkshopPpmData>>('/Dashboard/GetWorkshopPpmData',
      {
        params: {
          'startDate': request.startDate.toDateString(),
          'endDate': request.endDate.toDateString()
        }
      });
  }
}
