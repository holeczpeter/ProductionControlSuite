import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddUser, DeleteUser, GetUser, GetUsersByRole, GetWorkshopsByUser, GetWorkshopsExceptByUser, Result, UpdateUser, UserModel, WorkshopUserItem } from '../../models/generated/generated';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private readonly httpClient: HttpClient) { }
  add(model: AddUser): Observable<Result> {
    return this.httpClient.post<Result>('User/Add', model)
  }

  update(model: UpdateUser): Observable<Result> {
    return this.httpClient.post<Result>('User/Update', model)
  }

  delete(model: DeleteUser): Observable<Result> {
    return this.httpClient.post<Result>('User/Delete', model)
  }
  
  get(request: GetUser): Observable<UserModel> {
    return this.httpClient.get<UserModel>('User/Get', { params: { id: request.id } });
  }

  getAll(): Observable<Array<UserModel>> {
    return this.httpClient.get<Array<UserModel>>('User/GetAll');
  }
  getWorkshopsByUser(request: GetWorkshopsByUser): Observable<Array<WorkshopUserItem>> {
    return this.httpClient.get<Array<WorkshopUserItem>>('User/getWorkshopsByUser', { params: { 'userId': request.userId } });
  }

  getWorkshopsExceptByUser(request: GetWorkshopsExceptByUser): Observable<Array<WorkshopUserItem>> {
    return this.httpClient.get<Array<WorkshopUserItem>>('User/GetWorkshopsExceptByUser', { params: { 'userId': request.userId } });
  }
 
}
