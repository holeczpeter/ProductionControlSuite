import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageModel } from '../../models/generated/generated';

@Injectable({
  providedIn: 'root'
})
export class LanguageDataService {

  constructor(private readonly httpClient: HttpClient) { }
  
  getAll(): Observable<Array<LanguageModel>> {
    return this.httpClient.get<Array<LanguageModel>>('/Language/GetAll');
  }

}
