import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetUserSettings, Result, UpdateUserSettings, UserSettingsModel } from '../../models/generated/generated';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  constructor(private readonly httpClient: HttpClient) { }

  updateUserSettings(model: UpdateUserSettings): Observable<Result> {
    return this.httpClient.post<Result>('UserSettings/UpdateUserSettings', model)
  }
  getUserSettings(request: GetUserSettings): Observable<UserSettingsModel> {
    return this.httpClient.get<UserSettingsModel>('UserSettings/GetUserSettings', { params: { id: request.id } });
  }
}
