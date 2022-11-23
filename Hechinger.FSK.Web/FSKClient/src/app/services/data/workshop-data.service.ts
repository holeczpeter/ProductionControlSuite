import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddWorkshop, DeleteWorkshop, Result, SelectModel, UpdateWorkshop, WorkshopModel } from '../../models/generated/generated';

@Injectable({
  providedIn: 'root'
})
export class WorkshopDataService {

  constructor(private readonly httpClient: HttpClient) { }

  add(model: AddWorkshop): Observable<Result>{
    return this.httpClient.post<Result>('/Workshop/Add', model)
  }

  update(model: UpdateWorkshop): Observable<Result> {
    return this.httpClient.post<Result>('/Workshop/Update', model)
  }

  delete(model: DeleteWorkshop): Observable<Result> {
    return this.httpClient.post<Result>('/Workshop/Delete', model)
  }

  getByFilter(filter: string): Observable<Array<SelectModel>> {
    return this.httpClient.get<Array<SelectModel>>('/Workshop/GetByFilter', {
      params:
      {
        filter: filter,
      }
    });
  }

  get(): Observable<WorkshopModel> {
    return this.httpClient.get<WorkshopModel>('/Workshop/Get');
  }

  getAll(): Observable<Array<WorkshopModel>> {
    return this.httpClient.get<Array<WorkshopModel>>('/Workshop/GetAll');
  }
}
