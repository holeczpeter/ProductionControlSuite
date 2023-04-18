import { Injectable } from "@angular/core";
import { AccountService } from "../services/account.service";

export class PaginationModel {

  constructor(private readonly _accountService: AccountService) {
  }
  selectItemsPerPage: number[] = [5, 10, 25, 50, 100];
  pageSize = this._accountService.getPageSize();
  pageIndex = 1;
  allItemsLength = 0;
}
