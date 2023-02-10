import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationInfo } from '../../models/generated/generated';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private readonly httpClient: HttpClient) { }

  get(): Observable<ApplicationInfo> {
    return this.httpClient.get<ApplicationInfo>('Application/GetApplicationInformation');
  }
}
