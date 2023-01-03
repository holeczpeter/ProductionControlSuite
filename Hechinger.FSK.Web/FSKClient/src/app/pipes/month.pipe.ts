import { Pipe, PipeTransform } from '@angular/core';
import { DateService } from '../services/date.service';

@Pipe({
  name: 'month'
})
export class MonthPipe implements PipeTransform {
  constructor(public dateService: DateService) {
  }
  transform(value: string, args:string): string {
    let month = Number(value)
    return this.dateService.getMonthNameByLang(month, args);
  }
}
