import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories = [
    {
      value: 0, name: 'F0', backgroundColor: '#FFCA39',
    },
    {
      value: 1, name: 'F1', backgroundColor: '#F35B5A',
    },
    {
      value: 2, name: 'F2', backgroundColor: '#379DDA',
    }
  ]
  getCategories() {
    return this.categories;
  }
  constructor() { }
}
