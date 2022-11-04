import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProduct, AddProductContext, DeleteProduct, GetProduct, ProductModel, Result, SelectModel, UpdateProduct, UpdateProductContext } from '../../models/generated/generated';
import { DefectFilterService } from '../table/defect-filter.service';
import { PaginationService } from '../table/pagination.service';
import { SortService } from '../table/sort.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor(private readonly httpClient: HttpClient,
    private readonly paginationService: PaginationService,
    private readonly sortService: SortService,
    private readonly filterService: DefectFilterService) { }

  add(request: AddProduct): Observable<Result> {
    return this.httpClient.post<Result>('/Product/Add', request)
  }

  update(request: UpdateProduct): Observable<Result> {
    return this.httpClient.post<Result>('/Product/Update', request)
  }
  addContext(request: AddProductContext): Observable<Result> {
    return this.httpClient.post<Result>('/Product/Add', request)
  }

  updateContext(request: UpdateProductContext): Observable<Result> {
    return this.httpClient.post<Result>('/Product/Update', request)
  }
  delete(request: DeleteProduct): Observable<Result> {
    return this.httpClient.post<Result>('/Product/Delete', request)
  }

  get(request: GetProduct): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>('/Product/Get', {
      params:
      {
        id: request.id,
      }});
  }
  getByFilter(filter: string): Observable<Array<SelectModel>> {
    return this.httpClient.get<Array<SelectModel>> ('/Product/GetByFilter', {
      params:
      {
        filter: filter,
      }
    });
  }
  getAll(): Observable<any> {
    return this.httpClient.get<any>('/Product/GetAll', {
      params:
      {
        code: this.filterService.getValue('code'),
        name: this.filterService.getValue('name'),
        translatedName: this.filterService.getValue('translatedName'),
        workshopName: this.filterService.getValue('workshopName'),
        orderBy: this.sortService.orderBy,
        isAsc: this.sortService.isAsc,
        page: this.paginationService.page,
        pageCount: this.paginationService.pageCount,
      }, observe: 'response'
    });
  }
}
