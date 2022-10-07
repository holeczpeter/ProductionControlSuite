import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddSummaryCard, OperationModel, Result, SummaryCardDetailModel, SummaryCardModel, UpdateSummaryCard } from '../../models/generated';

@Injectable({
  providedIn: 'root'
})
export class SummaryCardDataService {

  constructor(private readonly httpClient: HttpClient) { }

  add(model: AddSummaryCard): Observable<Result> {
    return this.httpClient.post<Result>('/SummaryCard/Add', model)
  }

  update(model: UpdateSummaryCard): Observable<Result> {
    return this.httpClient.post<Result>('/SummaryCard/Update', model)
  }

  delete(model: any): Observable<Result> {
    return this.httpClient.post<Result>('/SummaryCard/Delete', model)
  }

  get(id : number): Observable<SummaryCardDetailModel> {
    return this.httpClient.get<SummaryCardDetailModel>('/SummaryCard/Get', {
      params: {
        "id": id
      }
    });
  }

  getAll(): Observable<Array<SummaryCardModel>> {
    return this.httpClient.get<Array<SummaryCardModel>>('/SummaryCard/GetAll');
  }
}
