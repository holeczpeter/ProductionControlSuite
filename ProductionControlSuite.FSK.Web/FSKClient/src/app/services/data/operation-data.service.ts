import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddOperation, DeleteOperation, GetOperation, GetOperationPrint, GetOperationsByProduct, OperationModel, OperationPrintModel, Result, SelectModel, UpdateOperation } from '../../models/generated/generated';
import { DefectFilterService } from '../table/defect-filter.service';
import { PaginationService } from '../table/pagination.service';
import { SortService } from '../table/sort.service';

@Injectable({
  providedIn: 'root'
})
export class OperationDataService {

  constructor(private readonly httpClient: HttpClient,
    private readonly paginationService: PaginationService,
    private readonly sortService: SortService,
    private readonly filterService: DefectFilterService) { }

  add(request: AddOperation): Observable<Result> {
    return this.httpClient.post<Result>('Operation/Add', request)
  }

  update(request: UpdateOperation): Observable<Result> {
    return this.httpClient.post<Result>('Operation/Update', request)
  }

  delete(request: DeleteOperation): Observable<Result> {
    return this.httpClient.post<Result>('Operation/Delete', request)
  }

  get(request: GetOperation): Observable<OperationModel> {
    return this.httpClient.get<OperationModel>('Operation/Get', {
      params: {
        "id": request.id
      }
    });
  }
  getByProduct(request: GetOperationsByProduct): Observable<Array<OperationModel>> {
    return this.httpClient.get<Array<OperationModel>>('Operation/GetByProduct', {
      params: {
        "productId": request.productId
      }
    });
  }
  getByFilter(filter: string): Observable<Array<SelectModel>> {
    return this.httpClient.get<Array<SelectModel>>('Operation/GetByFilter', {
      params:
      {
        filter: filter,
      }
    });
  }
  getAllOperationByParameters(totalCount: number | null): Observable<any> {
    let count = totalCount != null ? totalCount : this.paginationService.pageCount;
    return this.httpClient.get<any>('Operation/GetAllOperationByParameters', {
      params:
      {
        code: this.filterService.getValue('code'),
        name: this.filterService.getValue('name'),
        translatedName: this.filterService.getValue('translatedName'),
        productCode: this.filterService.getValue('productCode'),
        productName: this.filterService.getValue('productName'),
        statusName: this.filterService.getValue('statusName'),
        operationTime: this.filterService.getValue('operationTime'),
        norma: this.filterService.getValue('norma'),
        ppmGoal: this.filterService.getValue('ppmGoal'),
        defectsCount: this.filterService.getValue('defectsCount'),
        orderBy: this.sortService.orderBy,
        isAsc: this.sortService.isAsc,
        page: this.paginationService.page,
        pageCount: count,
      }, observe: 'response'
    });
  }
  getAll(): Observable<Array<OperationModel>> {
    return this.httpClient.get<Array<OperationModel>>('Operation/GetAll');
  }
  getPrint(request: GetOperationPrint): Observable<OperationPrintModel> {
    return this.httpClient.get<OperationPrintModel>('Operation/GetPrint', {
      params: {
        "id": request.id
      }
    });
  }
}
