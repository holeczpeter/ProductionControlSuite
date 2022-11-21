import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  GetDefectGroupContext, Result, SaveEntityGroup, SaveProductContext } from '../../models/generated/generated';

@Injectable({
  providedIn: 'root'
})
export class DefectGroupDataService {

  constructor(private readonly httpClient: HttpClient) { }

  saveDefectGroupContext(request: SaveEntityGroup): Observable<Result> {
    return this.httpClient.post<Result>('/DefectGroup/SaveDefectGroupContext', request)
  }
  getDefectGroupContext(request: GetDefectGroupContext): Observable<EntityGr> {
    return this.httpClient.get<DefectGroupContext>('/DefectGroup/GetDefectGroupContext', {
      params:
      {
        id: request.id,
      }
    });
  }
}
