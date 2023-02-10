import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddShift, DeleteShift, Result, ShiftModel, UpdateShift } from '../../models/generated/generated';

@Injectable({
  providedIn: 'root'
})
export class ShiftDataService {

  constructor(private readonly httpClient: HttpClient) { }

  add(model: AddShift): Observable<Result> {
    return this.httpClient.post<Result>('Shift/Add', model)
  }

  update(model: UpdateShift): Observable<Result> {
    return this.httpClient.post<Result>('Shift/Update', model)
  }

  delete(model: DeleteShift): Observable<Result> {
    return this.httpClient.post<Result>('Shift/Delete', model)
  }

  get(): Observable<ShiftModel> {
    return this.httpClient.get<ShiftModel>('Shift/Get');
  }

  getAll(): Observable<Array<ShiftModel>> {
    return this.httpClient.get<Array<ShiftModel>>('Shift/GetAll');
  }
}
