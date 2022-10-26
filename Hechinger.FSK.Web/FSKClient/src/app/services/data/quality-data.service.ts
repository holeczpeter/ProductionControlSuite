import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetMonthlyQualityHistory, MonthlyQualityModel } from '../../models/generated/generated';

@Injectable({
  providedIn: 'root'
})
export class QualityDataService {


  constructor(private readonly httpClient: HttpClient) { }

  //get(): Observable<QualityAssuranceProductModel> {
  //  return this.httpClient.get<QualityAssuranceProductModel>('/QualityAssurance/Get');
  //}
  getMonthlyQualityHistory(request: GetMonthlyQualityHistory): Observable<Array<MonthlyQualityModel>> {
    return this.httpClient.get<Array<MonthlyQualityModel>>('/Quality/GetMonthlyQualityHistory', { params: { productId : request.productId, year : request.year } });
  }
  import(): Observable<boolean> {
    return this.httpClient.post<boolean>('/Quality/import', null)
  }

  
}
