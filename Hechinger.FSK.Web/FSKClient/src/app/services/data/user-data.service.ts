import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddUser, DeleteUser, Result, UpdateUser, UserModel } from '../../models/generated';

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

  get(): Observable<UserModel> {
    return this.httpClient.get<UserModel>('/User/Get');
  }

  getAll(): Observable<Array<UserModel>> {
    return this.httpClient.get<Array<UserModel>>('/User/GetAll');
  }
  
  
}
