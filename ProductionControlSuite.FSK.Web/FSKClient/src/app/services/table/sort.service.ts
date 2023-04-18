import { Injectable } from '@angular/core';
import { SortModel } from '../../models/sort-model';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  private sortModel!: SortModel;
  constructor() {
    this.sortModel = { orderBy: 'id', isAsc: false };
  }
  get orderBy(): string {
    return this.sortModel.orderBy ?? 'id';
  }

  get isAsc(): boolean {
    return this.sortModel.isAsc;
  }

  sort(property: string, isAsc: boolean) {
    this.sortModel.orderBy = property;
    this.sortModel.isAsc = isAsc;
  }
}

