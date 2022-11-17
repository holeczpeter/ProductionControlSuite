import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefectStatisticModel, GetDefectStatisticsByUser, GetMonthlyQualityHistory, GetQuantityReportByOperation, GetQuantityReportByProduct, GetWorkerStatisticsByDefect, MonthlyQualityModel, QuantityOperationReportModel, WorkerStatisticsModel } from '../../models/generated/generated';

@Injectable({
  providedIn: 'root'
})
export class QualityDataService {
  constructor(private readonly httpClient: HttpClient) { }


  getMonthlyQualityHistory(request: GetMonthlyQualityHistory): Observable<Array<MonthlyQualityModel>> {
    return this.httpClient.get<Array<MonthlyQualityModel>>('/Quality/GetMonthlyQualityHistory', { params: { productId: request.productId, year: request.year } });
  }

  getDefectStatisticsByUser(request: GetDefectStatisticsByUser): Observable<DefectStatisticModel> {
    return this.httpClient.get<DefectStatisticModel>('/Quality/GetDefectStatisticsByUser', {
      params:
      {
        'workerCode': request.workerCode,
        'operationId': request.operationId,
        'startDate': request.startDate.toDateString(),
        'endDate': request.endDate.toDateString()
      }
    });
  }

  getWorkerStatisticsByDefect(request: GetWorkerStatisticsByDefect): Observable<WorkerStatisticsModel> {
    return this.httpClient.get<WorkerStatisticsModel>('/Quality/GetWorkerStatisticsByDefect', {
      params:
      {
        'defectId': request.defectId,
        'startDate': request.startDate.toDateString(),
        'endDate': request.endDate.toDateString()
      }
    });
  }
  getQuantityReportByOperation(request: GetQuantityReportByOperation): Observable<QuantityOperationReportModel> {
    return this.httpClient.get<QuantityOperationReportModel>('/Quality/GetQuantityReportByOperation', {
      params:
      {
        'operationId': request.operationId,
        'startDate': request.startDate.toDateString(),
        'endDate': request.endDate.toDateString()
      }
    });
  }
  getQuantityReportByProduct(request: GetQuantityReportByProduct): Observable<Array<QuantityOperationReportModel>> {
    return this.httpClient.get<Array<QuantityOperationReportModel>>('/Quality/GetQuantityReportByProduct', {
      params:
      {
        'productId': request.productId,
        'startDate': request.startDate.toDateString(),
        'endDate': request.endDate.toDateString()
      }
    });
  }
  
}
