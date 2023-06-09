import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categorysplit'
})
export class CategorySplitPipe implements PipeTransform {

  transform(value: string, arg1: any): string {
    const myArray = value.split("_");
    const index = arg1;
    switch (myArray[index]) {
      case '0': return "F0";
      case '1': return "F1";
      case '2': return "F2";
      default:
        return "F0";
    }
  }

}
