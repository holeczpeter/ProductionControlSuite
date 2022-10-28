import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefectStatisticModel, GetDefectStatisticsByUser, GetMonthlyQualityHistory, GetWorkerStatisticsByDefect, MonthlyQualityModel, WorkerStatisticModel } from '../../models/generated/generated';

@Injectable({
  providedIn: 'root'
})
export class QualityDataService {
  constructor(private readonly httpClient: HttpClient) { }

 
  getMonthlyQualityHistory(request: GetMonthlyQualityHistory): Observable<Array<MonthlyQualityModel>> {
    return this.httpClient.get<Array<MonthlyQualityModel>>('/Quality/GetMonthlyQualityHistory', { params: { productId : request.productId, year : request.year } });
  }

  getDefectStatisticsByUser(request: GetDefectStatisticsByUser): Observable<Array<DefectStatisticModel>> {
    return this.httpClient.get<Array<DefectStatisticModel>>('/Quality/GetDefectStatisticsByUser', {
      params:
      {
        'workerCode': request.workerCode,
        'operationId': request.operationId,
        'startDate': request.startDate.toDateString(),
        'endDate': request.endDate.toDateString()
      }
    });
  }

  getWorkerStatisticsByDefect(request: GetWorkerStatisticsByDefect): Observable<Array<WorkerStatisticModel>> {
    return this.httpClient.get<Array<WorkerStatisticModel>>('/Quality/GetWorkerStatisticsByDefect', {
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
