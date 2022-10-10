import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddRole, DeleteRole, GetRole, Result, RoleDetailModel, RoleModel, SetDefaultRole, UpdateRole } from '../../models/generated';

@Injectable({
  providedIn: 'root'
})
export class RoleDataService {

  constructor(private readonly httpClient: HttpClient) { }

  add(model: AddRole): Observable<Result> {
    return this.httpClient.post<Result>('/Role/Add', model)
  }

  update(model: UpdateRole): Observable<Result> {
    return this.httpClient.post<Result>('/Role/Update', model)
  }

  delete(model: DeleteRole): Observable<Result> {
    return this.httpClient.post<Result>('/Role/Delete', model)
  }
  setDefault(model: SetDefaultRole): Observable<Result> {
    return this.httpClient.post<Result>('/Role/SetDefault', model)
  }
  get(request: GetRole): Observable<RoleDetailModel> {
    return this.httpClient.get<RoleDetailModel>('/Role/Get',{
      params: {
        "id": request.id
      }
    });
  }
  getAll(): Observable<Array<RoleModel>> {
    return this.httpClient.get<Array<RoleModel>>('/Role/GetAll');
  }
}
