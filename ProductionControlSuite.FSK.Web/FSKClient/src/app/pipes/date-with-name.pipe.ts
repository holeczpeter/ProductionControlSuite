import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DateService } from '../services/date.service';

@Pipe({
  name: 'dateWithName'
})
export class DateWithNamePipe implements PipeTransform {
 
  constructor(public dateService: DateService) {
  }
  transform(value: string, arg1: any): string {
    let date = new Date(value);
   
    return this.dateService.getDayNameByLang(date,arg1);
  }

}
