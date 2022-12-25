import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrapCostProductModel, CrapCostWorkshopModel, DefectStatisticModel, GetCrapCostByOperation, GetCrapCostByProduct, GetCrapCostByWorkshop, GetDefectStatisticsByUser, GetGroupReport, GetMonthlyQualityHistory, GetQuantityReportByOperation, GetQuantityReportByProduct, GetWorkerStatisticsByDefect, GroupReportModel, MonthlyQualityModel, QuantityOperationReportModel, WorkerStatisticsModel } from '../../models/generated/generated';

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
  getCrapCostByOperation(request: GetCrapCostByOperation): Observable<CrapCostProductModel> {
    return this.httpClient.get<CrapCostProductModel>('/Quality/GetCrapCostByOperation', {
      params:
      {
        'operationId': request.operationId,
        'startDate': request.startDate.toDateString(),
        'endDate': request.endDate.toDateString()
      }
    });
  }
  getCrapCostByProduct(request: GetCrapCostByProduct): Observable<CrapCostProductModel> {
    return this.httpClient.get<CrapCostProductModel>('/Quality/GetCrapCostByProduct', {
      params:
      {
        'productId': request.productId,
        'startDate': request.startDate.toDateString(),
        'endDate': request.endDate.toDateString()
      }
    });
  }
  getCrapCostByWorkshop(request: GetCrapCostByWorkshop): Observable<CrapCostWorkshopModel> {
    return this.httpClient.get<CrapCostWorkshopModel>('/Quality/GetCrapCostByWorkshop', {
      params:
      {
        'workshopId': request.workshopId,
        'startDate': request.startDate.toDateString(),
        'endDate': request.endDate.toDateString()
      }
    });
  }
  getGroupReport(request: GetGroupReport): Observable<GroupReportModel> {
    return this.httpClient.get<GroupReportModel>('/Quality/GetGroupReport', {
      params:
      {
        'entityGroupId': request.entityGroupId,
        'startDate': request.startDate.toDateString(),
        'endDate': request.endDate.toDateString()
      }
    });
  }
}
