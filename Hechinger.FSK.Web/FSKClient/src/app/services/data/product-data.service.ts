import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProduct, DeleteProduct, ProductModel, Result, UpdateProduct } from '../../models/generated';
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
