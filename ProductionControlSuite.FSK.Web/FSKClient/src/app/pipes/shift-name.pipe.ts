import { Pipe, PipeTransform } from '@angular/core';
import { ShiftModel } from '../models/generated/generated';

@Pipe({
  name: 'shiftName'
})
export class ShiftNamePipe implements PipeTransform {

  transform(value: string, args: string, args2: ShiftModel[]): string {
  
    const myArray = value.split("_");
    let shift = args2.find(x => x.id.toString() == myArray[1]);
    if (shift) return args == 'hu' ? shift.name : shift.translatedName;
    else return "-";
  }
}
