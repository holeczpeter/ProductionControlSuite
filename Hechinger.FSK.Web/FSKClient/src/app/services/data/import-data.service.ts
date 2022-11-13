import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../../models/generated/generated';

@Injectable({
  providedIn: 'root'
})
export class ImportDataService {

  constructor(private readonly httpClient: HttpClient) { }

  importOperation(formData: FormData): Observable<Result> {
    return this.httpClient.post<Result>('/Import/ImportOperation', formData)
  }
  importDefect(formData: FormData): Observable<Result> {
    return this.httpClient.post<Result>('/Import/ImportDefect', formData)
  }
  importSummaryCard(formData: FormData): Observable<Result> {
    return this.httpClient.post<Result>('/Import/ImportSummaryCard', formData)
  }
}
