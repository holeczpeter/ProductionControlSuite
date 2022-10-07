import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddDefect, DefectModel, DeleteDefect, EnumModel, GetDefectsByOperation, Result, UpdateDefect } from '../../models/generated';

@Injectable({
  providedIn: 'root'
})
export class DefectDataService {

  constructor(private readonly httpClient: HttpClient) { }

  add(model: AddDefect): Observable<Result> {
    return this.httpClient.post<Result>('/Defect/Add', model)
  }

  update(model: UpdateDefect): Observable<Result> {
    return this.httpClient.post<Result>('/Defect/Update', model)
  }

  delete(model: DeleteDefect): Observable<Result> {
    return this.httpClient.post<Result>('/Defect/Delete', model)
  }

  get(): Observable<DefectModel> {
    return this.httpClient.get<DefectModel>('/Defect/Get');
  }
  getByOperation(request: GetDefectsByOperation): Observable<Array<DefectModel>> {
    return this.httpClient.get<Array<DefectModel>>('/Defect/GetByOperation', {
      params: {
        "operationId": request.operationId
      }
    });
  }

  getAll(): Observable<Array<DefectModel>> {
    return this.httpClient.get<Array<DefectModel>>('/Defect/GetAll');
  }
  getAllDefectCategories(): Observable<Array<EnumModel>> {
    return this.httpClient.get<Array<EnumModel>>('/Defect/GetAllDefectCategories');
  }
}
