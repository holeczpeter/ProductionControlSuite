import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): string {
    const myArray = value.split("_");
    switch (myArray[2]) {
      case '0': return "F0";
      case '1': return "F1";
      case '2': return "F2";
      default:
        return "F0";
    }
  }

}
