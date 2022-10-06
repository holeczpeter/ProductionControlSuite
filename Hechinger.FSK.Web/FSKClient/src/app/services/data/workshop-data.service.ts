import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddWorkshop, DeleteWorkshop, Result, UpdateWorkshop, WorkshopModel } from '../../models/generated';

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

  get(): Observable<WorkshopModel> {
    return this.httpClient.get<WorkshopModel>('/Workshop/Get');
  }

  getAll(): Observable<Array<WorkshopModel>> {
    return this.httpClient.get<Array<WorkshopModel>>('/Workshop/GetAll');
  }
}
