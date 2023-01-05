import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AddSummaryCard, IntervalModel, OperationModel, Result, SummaryCardDetailModel, SummaryCardModel, UpdateSummaryCard } from '../../models/generated/generated';
import { DefectFilterService } from '../table/defect-filter.service';
import { PaginationService } from '../table/pagination.service';
import { SortService } from '../table/sort.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryCardDataService {

  constructor(private readonly httpClient: HttpClient,
    private readonly paginationService: PaginationService,
    private readonly sortService: SortService,
    private readonly translateService: TranslateService,
    private readonly filterService: DefectFilterService) { }

  add(model: AddSummaryCard): Observable<Result> {
    return this.httpClient.post<Result>('/SummaryCard/Add', model)
  }

  update(model: UpdateSummaryCard): Observable<Result> {
    return this.httpClient.post<Result>('/SummaryCard/Update', model)
  }

  delete(model: any): Observable<Result> {
    return this.httpClient.post<Result>('/SummaryCard/Delete', model)
  }

  get(id : number): Observable<SummaryCardDetailModel> {
    return this.httpClient.get<SummaryCardDetailModel>('/SummaryCard/Get', {
      params: {
        "id": id
      }
    });
  }
  getAll(): Observable<Array<SummaryCardModel>> {
    return this.httpClient.get<Array<SummaryCardModel>>('/SummaryCard/GetAll');
  }
  getAllSummaryCardsByParameters(interval: IntervalModel, totalCount: number | null): Observable<any> {
    let date = this.filterService.getValue('date') != null ? new Date(this.filterService.getValue('date')).toDateString() : "";
    let created = this.filterService.getValue('created') != null ? new Date(this.filterService.getValue('created')).toDateString() : "";
    let count = totalCount != null ? totalCount : this.paginationService.pageCount;
    return this.httpClient.get<any>('/SummaryCard/GetAllSummaryCardsByParameters', {
      params:
      {
        startDate: interval.startDate.toDateString(),
        endDate: interval.endDate.toDateString(),
        lang: this.translateService.currentLang,
        date: date,
        created: created,
        operationCode: this.filterService.getValue('operationCode'),
        operationName: this.filterService.getValue('operationName'),
        userName: this.filterService.getValue('userName'),
        shiftName: this.filterService.getValue('shiftName'),
        quantity: this.filterService.getValue('quantity'),
        workerName: this.filterService.getValue('workerName'),
        orderBy: this.sortService.orderBy,
        isAsc: this.sortService.isAsc,
        page: this.paginationService.page,
        pageCount: count,
      }, observe: 'response'
    });
  }
}
