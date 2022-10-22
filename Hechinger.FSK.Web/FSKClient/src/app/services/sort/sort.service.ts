import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }
  sortByName(items: Array<any>, key: string) {
    items.sort(function (a, b) {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  compareNumber(a: number, b: number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  compareNumberAsString(a: string, b: string, isAsc: boolean) {
    return (Number(a) < Number(b) ? -1 : 1) * (isAsc ? 1 : -1);
  }

  compareBoolean(a: boolean, b: boolean, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  compareString(a: string, b: string, isAsc: boolean) {
    if (a == null || a === "") return 1 * (isAsc ? 1 : -1);
    if (b == null || b === "") return -1 * (isAsc ? 1 : -1);
    else return a.trimLeft().toLowerCase().localeCompare(b.trimLeft().toLowerCase(), 'hu') * (isAsc ? 1 : -1);
  }

  compareDateAsString(a: string, b: string, isAsc: boolean) {
    let aNumber = (new Date(a).getTime());
    let bNumber = (new Date(b).getTime());
    if (isNaN(aNumber) || a == null) return 1 * (isAsc ? 1 : -1);
    if (isNaN(bNumber) || b == null) return -1 * (isAsc ? 1 : -1);
    else return ((aNumber < bNumber) ? -1 : 1) * (isAsc ? 1 : -1);
  }

  compareDate(a: Date, b: Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  compareBooleanAndNumber(aBool: boolean, bBool: boolean, aNum: number, bNum: number, isAsc: boolean) {
    if (aBool === bBool) {
      return (aNum < bNum ? -1 : 1) * (isAsc ? 1 : -1);
    }
    return aBool ? -1 : 1;
  }
}
