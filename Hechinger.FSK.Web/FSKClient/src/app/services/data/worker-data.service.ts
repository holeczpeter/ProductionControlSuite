import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkerModel } from '../../models/generated/generated';

@Injectable({
  providedIn: 'root'
})
export class WorkerDataService {

  constructor(private readonly httpClient: HttpClient) { }

  getByFilter(filter: string): Observable<Array<WorkerModel>> {
    return this.httpClient.get<Array<WorkerModel>>('Worker/GetByFilter', { params: { filter: filter } });
  }
  getAll(): Observable<Array<WorkerModel>> {
    return this.httpClient.get<Array<WorkerModel>>('Worker/GetAll');
  }
}

