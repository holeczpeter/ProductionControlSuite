import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: number): string {
   
    switch (value) {
      case 0: return "F0";
      case 1: return "F1";
      case 2: return "F2";
      default:
        return "F0";
    }
  }

}
