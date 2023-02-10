import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProduct, DeleteProduct, GetProduct, GetProductContext, ProductContext, ProductModel, Result, SaveProductContext, SelectModel, UpdateProduct } from '../../models/generated/generated';
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
    return this.httpClient.post<Result>('Product/Add', request)
  }

  update(request: UpdateProduct): Observable<Result> {
    return this.httpClient.post<Result>('Product/Update', request)
  }
  saveProductContext(request: SaveProductContext): Observable<Result> {
    return this.httpClient.post<Result>('Product/SaveProductContext', request)
  }
  delete(request: DeleteProduct): Observable<Result> {
    return this.httpClient.post<Result>('Product/Delete', request)
  }

  get(request: GetProduct): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>('Product/Get', {
      params:
      {
        id: request.id,
      }});
  }
  getProductContext(request: GetProductContext): Observable<ProductContext> {
    return this.httpClient.get<ProductContext>('Product/GetProductContext', {
      params:
      {
        id: request.id,
      }
    });
  }
  getByFilter(filter: string): Observable<Array<SelectModel>> {
    return this.httpClient.get<Array<SelectModel>> ('Product/GetByFilter', {
      params:
      {
        filter: filter,
      }
    });
  }
  getAll(): Observable<Array<ProductModel>> {
    return this.httpClient.get<Array<ProductModel>>('Product/GetAll');
  }
  getProductsByParameters(totalCount: number | null): Observable<any> {
    let count = totalCount != null ? totalCount : this.paginationService.pageCount;
    return this.httpClient.get<any>('Product/GetProductsByParameters', {
      params:
      {
        code: this.filterService.getValue('code'),
        name: this.filterService.getValue('name'),
        translatedName: this.filterService.getValue('translatedName'),
        workshopName: this.filterService.getValue('workshopName'),
        orderBy: this.sortService.orderBy,
        isAsc: this.sortService.isAsc,
        page: this.paginationService.page,
        pageCount: count,
      }, observe: 'response'
    });
  }
}
