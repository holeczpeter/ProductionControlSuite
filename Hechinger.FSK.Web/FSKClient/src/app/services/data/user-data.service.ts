import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddUser, DeleteUser, GetUser, Result, UpdateUser, UpdateUserSettings, UserModel } from '../../models/generated';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private readonly httpClient: HttpClient) { }
  add(model: AddUser): Observable<Result> {
    return this.httpClient.post<Result>('/User/Add', model)
  }

  update(model: UpdateUser): Observable<Result> {
    return this.httpClient.post<Result>('/User/Update', model)
  }

  delete(model: DeleteUser): Observable<Result> {
    return this.httpClient.post<Result>('/User/Delete', model)
  }
  
  get(request: GetUser): Observable<UserModel> {
    return this.httpClient.get<UserModel>('/User/Get', { params: { id: request.id } });
  }

  getAll(): Observable<Array<UserModel>> {
    return this.httpClient.get<Array<UserModel>>('/User/GetAll');
  }
 
 
}
