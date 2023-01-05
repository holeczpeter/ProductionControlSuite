import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginationModel } from '../../models/pagination-model';
import { AccountService } from '../account.service';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private paginationModel: PaginationModel;

  get page(): number {
    return this.paginationModel.pageIndex;
  }

  get selectItemsPerPage(): number[] {
    return this.paginationModel.selectItemsPerPage;
  }

  get pageCount(): number {
    return this.paginationModel.pageSize;
  }
  get allItemsLength(): number {
    return this.paginationModel.allItemsLength;
  }
  constructor(private readonly accountService: AccountService) {
    this.paginationModel = new PaginationModel(accountService);
  }

  change(pageEvent: PageEvent): void {
    this.paginationModel.pageIndex = pageEvent.pageIndex + 1;
    this.paginationModel.pageSize = pageEvent.pageSize;
    this.paginationModel.allItemsLength = pageEvent.length;
  }
}

