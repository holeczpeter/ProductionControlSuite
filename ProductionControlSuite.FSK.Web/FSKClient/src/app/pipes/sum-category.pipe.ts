import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumCategory'
})
export class SumCategoryPipe implements PipeTransform {

  transform(value: string): unknown {
   
    const myArray = value.split("_");
    switch (myArray[0]) {
      case '0': return "F0";
      case '1': return "F1";
      case '2': return "F2";
      default:
        return "F0";
    }
  }

}
