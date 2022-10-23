import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddOperation, DeleteOperation, GetOperation, GetOperationsByProduct, OperationModel, Result, SelectModel, UpdateOperation } from '../../models/generated';

@Injectable({
  providedIn: 'root'
})
export class OperationDataService {

  constructor(private readonly httpClient: HttpClient) { }

  add(model: AddOperation): Observable<Result> {
    return this.httpClient.post<Result>('/Operation/Add', model)
  }

  update(model: UpdateOperation): Observable<Result> {
    return this.httpClient.post<Result>('/Operation/Update', model)
  }

  delete(model: DeleteOperation): Observable<Result> {
    return this.httpClient.post<Result>('/Operation/Delete', model)
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

  getAll(): Observable<Array<OperationModel>> {
    return this.httpClient.get<Array<OperationModel>>('/Operation/GetAll');
  }
  getAllSelect(): Observable<Array<SelectModel>> {
    return this.httpClient.get<Array<SelectModel>>('/Operation/GetAllSelectModel');
  }
}
