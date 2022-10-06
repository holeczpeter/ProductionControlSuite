import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProduct, DeleteProduct, ProductModel, Result, UpdateProduct } from '../../models/generated';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor(private readonly httpClient: HttpClient) { }

  add(model: AddProduct): Observable<Result> {
    return this.httpClient.post<Result>('/Product/Add', model)
  }

  update(model: UpdateProduct): Observable<Result> {
    return this.httpClient.post<Result>('/Product/Update', model)
  }

  delete(model: DeleteProduct): Observable<Result> {
    return this.httpClient.post<Result>('/Product/Delete', model)
  }

  get(): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>('/Product/Get');
  }

  getAll(): Observable<Array<ProductModel>> {
    return this.httpClient.get<Array<ProductModel>>('/Product/GetAll');
  }
}
