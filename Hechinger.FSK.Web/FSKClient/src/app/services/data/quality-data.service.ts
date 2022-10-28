import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetMonthlyQualityHistory, GetWorkerCompare, MonthlyQualityModel, WorkerCompare } from '../../models/generated/generated';

@Injectable({
  providedIn: 'root'
})
export class QualityDataService {
  constructor(private readonly httpClient: HttpClient) { }

 
  getMonthlyQualityHistory(request: GetMonthlyQualityHistory): Observable<Array<MonthlyQualityModel>> {
    return this.httpClient.get<Array<MonthlyQualityModel>>('/Quality/GetMonthlyQualityHistory', { params: { productId : request.productId, year : request.year } });
  }

  getDefectCompareByUser(request: GetWorkerCompare): Observable<Array<WorkerCompare>> {
    return this.httpClient.get<Array<WorkerCompare>>('/Quality/GetDefectCompareByUser', {
      params:
      {
        'defectId': request.defectId,
        'startDate': request.startDate.toDateString(),
        'endDate': request.endDate.toDateString()
      }
    });
  }

  getWorkerCompare(request: GetWorkerCompare): Observable<Array<WorkerCompare>> {
    return this.httpClient.get<Array<WorkerCompare>>('/Quality/GetWorkerCompare', {
      params:
      {
        'defectId': request.defectId,
        'startDate': request.startDate.toDateString(),
        'endDate': request.endDate.toDateString()
      }
    });
  }

  import(): Observable<boolean> {
    return this.httpClient.post<boolean>('/Quality/import', null)
  }

}
