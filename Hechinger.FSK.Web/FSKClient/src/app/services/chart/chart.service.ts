import { Injectable } from '@angular/core';
import { DefectCategories } from '../../models/generated/generated';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  getColor(category: DefectCategories): string {
    switch (category) {
      case 0: return '#FFCA39';
      case 1: return '#F35B5A';
      case 2: return '#379DDA';
      default: return '#F35B5A';
    }
  }
}
