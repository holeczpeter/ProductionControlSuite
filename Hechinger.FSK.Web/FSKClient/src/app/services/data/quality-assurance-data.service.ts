import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QualityAssuranceProductModel } from '../../models/generated';

@Injectable({
  providedIn: 'root'
})
export class QualityAssuranceDataService {


  constructor(private readonly httpClient: HttpClient) { }

  get(): Observable<QualityAssuranceProductModel> {
    return this.httpClient.get<QualityAssuranceProductModel>('/QualityAssurance/Get');
  }
}
