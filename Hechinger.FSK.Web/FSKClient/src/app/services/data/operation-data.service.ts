import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddOperation, DeleteOperation, GetOperation, GetOperationsByProduct, OperationModel, Result, SaveOperationContext, SelectModel, UpdateOperation } from '../../models/generated/generated';
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
    return this.httpClient.post<Result>('/Operation/Add', request)
  }

  update(request: UpdateOperation): Observable<Result> {
    return this.httpClient.post<Result>('/Operation/Update', request)
  }

  saveContext(request: SaveOperationContext): Observable<Result> {
    return this.httpClient.post<Result>('/Operation/SaveOperationContext', request)
  }
 
  delete(request: DeleteOperation): Observable<Result> {
    return this.httpClient.post<Result>('/Operation/Delete', request)
  }

  get(request: GetOperation): Observable<OperationModel> {
    return this.httpClient.get<OperationModel>('/Operation/Get', {
      params: {
        "id": request.id
      }
    });
  }
  getByProduct(request: GetOperationsByProduct): Observable<Array<OperationModel>> {
    return this.httpClient.get<Array<OperationModel>>('/Operation/GetByProduct', {
      params: {
        "productId": request.productId
      }
    });
  }
  getByFilter(filter: string): Observable<Array<SelectModel>> {
    return this.httpClient.get<Array<SelectModel>>('/Operation/GetByFilter', {
      params:
      {
        filter: filter,
      }
    });
  }
  getAll(): Observable<any> {
    return this.httpClient.get<any>('/Operation/GetAll',{
      params:
      {
        code: this.filterService.getValue('code'),
        name: this.filterService.getValue('name'),
        translatedName: this.filterService.getValue('translatedName'),
        productCode: this.filterService.getValue('productCode'),
        productName: this.filterService.getValue('productName'),
        orderBy: this.sortService.orderBy,
        isAsc: this.sortService.isAsc,
        page: this.paginationService.page,
        pageCount: this.paginationService.pageCount,
      }, observe: 'response'
    });
  }
 
}
