import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddOperation, DeleteOperation, OperationModel, Result, UpdateOperation } from '../../models/generated';

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

  get(): Observable<OperationModel> {
    return this.httpClient.get<OperationModel>('/Operation/Get');
  }
  getByProduct(): Observable<OperationModel> {
    return this.httpClient.get<OperationModel>('/Operation/GetByProduct');
  }

  getAll(): Observable<Array<OperationModel>> {
    return this.httpClient.get<Array<OperationModel>>('/Operation/GetAll');
  }
}
