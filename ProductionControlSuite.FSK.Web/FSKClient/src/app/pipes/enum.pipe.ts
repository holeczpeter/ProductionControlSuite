import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enum'
})
export class EnumPipe implements PipeTransform {

  transform(data: Object): unknown {
    const keys = Object.keys(data);
    return keys.slice(keys.length / 2);
  }

}
