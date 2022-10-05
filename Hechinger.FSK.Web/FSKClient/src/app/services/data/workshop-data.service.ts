import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkshopModel } from '../../models/generated';

@Injectable({
  providedIn: 'root'
})
export class WorkshopDataService {

  constructor(private readonly httpClient: HttpClient) { }

  get(): Observable<WorkshopModel> {
    return this.httpClient.get<WorkshopModel>('/Workshop/GetWorkshop');
  }
  getAll(): Observable<Array<WorkshopModel>> {
    return this.httpClient.get<Array<WorkshopModel>>('/Workshop/GetAllWorkshop');
  }
}
