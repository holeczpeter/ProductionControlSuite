import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddDefect, DefectModel, DeleteDefect, EnumModel, GetDefectsByOperation, Result, SelectModel, UpdateDefect } from '../../models/generated/generated';
import { DefectFilterService } from '../table/defect-filter.service';
import { PaginationService } from '../table/pagination.service';
import { SortService } from '../table/sort.service';

@Injectable({
  providedIn: 'root'
})
export class DefectDataService {

  constructor(private readonly httpClient: HttpClient,
    private readonly paginationService: PaginationService,
    private readonly sortService: SortService,
    private readonly filterService: DefectFilterService) { }

  add(model: AddDefect): Observable<Result> {
    return this.httpClient.post<Result>('/Defect/Add', model)
  }

  update(model: UpdateDefect): Observable<Result> {
    return this.httpClient.post<Result>('/Defect/Update', model)
  }

  delete(model: DeleteDefect): Observable<Result> {
    return this.httpClient.post<Result>('/Defect/Delete', model)
  }

  get(): Observable<DefectModel> {
    return this.httpClient.get<DefectModel>('/Defect/Get');
  }
  getByOperation(request: GetDefectsByOperation): Observable<Array<DefectModel>> {
    return this.httpClient.get<Array<DefectModel>>('/Defect/GetByOperation', {
      params: {
        "operationId": request.operationId
      }
    });
  }

  getAll(): Observable<any> {
    return this.httpClient.get<any>('/Defect/GetAll',{
      params:
      {
        code: this.filterService.getValue('code'),
        name: this.filterService.getValue('name'),
        translatedName: this.filterService.getValue('translatedName'),
        operationCode: this.filterService.getValue('operationCode'),
        operationName: this.filterService.getValue('operationName'),
        defectCategoryName: this.filterService.getValue('defectCategoryName'),
        orderBy: this.sortService.orderBy,
        isAsc: this.sortService.isAsc,
        page: this.paginationService.page,
        pageCount: this.paginationService.pageCount,
      }, observe: 'response'
    });
  }
  getAllDefectCategories(): Observable<Array<EnumModel>> {
    return this.httpClient.get<Array<EnumModel>>('/Defect/GetAllDefectCategories');
  }
  getSelectModel(filter: string): Observable<Array<SelectModel>> {
    return this.httpClient.get<Array<SelectModel>>('/Defect/GetSelectModel', {
      params:
      {
        filter: filter,
      }
    });
  }
}
