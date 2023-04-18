import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationInfo, HelpCenter } from '../../models/generated/generated';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private readonly httpClient: HttpClient) { }

  getApplicationInfo(): Observable<ApplicationInfo> {
    return this.httpClient.get<ApplicationInfo>('Application/GetApplicationInformation');
  }

  getHelpCenterInfo(): Observable<HelpCenter> {
    return this.httpClient.get<HelpCenter>('Application/GetHelpCenterInformation');
  }
}
