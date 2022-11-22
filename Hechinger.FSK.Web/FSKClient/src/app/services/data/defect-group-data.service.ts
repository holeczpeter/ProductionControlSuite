import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../../models/generated/generated';

@Injectable({
  providedIn: 'root'
})
export class DefectGroupDataService {

  constructor(private readonly httpClient: HttpClient) { }

  saveDefectGroupContext(request: any): Observable<Result> {
    return this.httpClient.post<Result>('/DefectGroup/SaveDefectGroupContext', request)
  }
  getDefectGroupContext(request: any): Observable<any> {
    return this.httpClient.get<any>('/DefectGroup/GetDefectGroupContext', {
      params:
      {
        id: request.id,
      }
    });
  }
}
