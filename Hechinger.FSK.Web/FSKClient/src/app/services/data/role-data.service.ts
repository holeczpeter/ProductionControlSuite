import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddRole, DeleteRole, GetMenuByRole, GetRole, GetUsersByRole, GetUsersExceptByRole, Result, RoleDetailModel, RoleMenuItem, RoleModel, RoleUserItem, SetDefaultRole, UpdateRole } from '../../models/generated';
import { TreeItem } from '../../models/tree-item';


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
    return this.httpClient.get<RoleDetailModel>('/Role/Get',{ params: {"id": request.id } });
  }

  getAll(): Observable<Array<RoleModel>> {
    return this.httpClient.get<Array<RoleModel>>('/Role/GetAll');
  }
  
  getUsersByRole(request: GetUsersByRole): Observable<Array<RoleUserItem>> {
    return this.httpClient.get<Array<RoleUserItem>>('/Role/GetUsersByRole', { params: { 'roleId': request.roleId } });
  }

  getUsersExceptByRole(request: GetUsersExceptByRole): Observable<Array<RoleUserItem>> {
    return this.httpClient.get<Array<RoleUserItem>>('/Role/GetUsersExceptByRole', { params: { 'roleId': request.roleId } });
  }

  getMenuByRole(request: GetMenuByRole): Observable<Array<TreeItem<RoleMenuItem>>> {
    return this.httpClient.get<Array<TreeItem<RoleMenuItem>>>('/Role/GetMenuByRole', { params: { 'roleId': request.roleId } });
  }
}
