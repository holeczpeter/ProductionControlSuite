import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { TextSearchSettings } from '../../models/enums/text-search-settings';
import { TableColumn } from '../../models/table-column';

@Injectable({
  providedIn: 'root'
})
export class TableFilterService {
  public get textSearchSettings(): typeof TextSearchSettings {
    return TextSearchSettings;
  }

  constructor(private fb: UntypedFormBuilder) { }

  createFilterFormGroup(filterableColumns: Array<TableColumn>): UntypedFormGroup {
    let form = new UntypedFormGroup({});
    form.addControl("textSearchSetting", new UntypedFormControl(this.textSearchSettings.isStartsWith.toString()));
   /* let dateArray: string[] = [];*/

    //filterableColumns.forEach(m => {
    //  if (m.type == FrontEndControlTypes.Date || m.type == FrontEndControlTypes.DateTime)
    //    dateArray.push(m.name);
    //});
    //form.addControl("dateTypes", new UntypedFormControl(dateArray.toString()));
    filterableColumns.forEach(x => {
      form.addControl(x.name, new UntypedFormControl());
    });
    return form;

  }



  getFiltered<T>(formGroup: UntypedFormGroup, items: Array<T>): Observable<Array<T>> {
    return formGroup.valueChanges.pipe(map(filters => {
      return items.filter(item => {
        if (formGroup.get("textSearchSetting")!.value == TextSearchSettings.isStartsWith) {
          let expression = new Array<boolean>();
          let map = new Map(Object.entries(item));
          Object.keys(formGroup.controls).filter(f => f != 'textSearchSetting').forEach(key => {
            console.log(key);
            console.log(map.get(key))
            console.log(filters[key])
           
            expression.push(filters[key] === '' || filters[key] === null ? true : map.get(key) !== null ? map.get(key).toString().toUpperCase().startsWith(filters[key].toString().toUpperCase()) : false);
          });
          if (expression.every((item) => item === true)) return true;
        }
        else if (formGroup.get("textSearchSetting")!.value == TextSearchSettings.isContains) {
          let expression = new Array<boolean>();
          let map = new Map(Object.entries(item));
          Object.keys(formGroup.controls).filter(f => f != 'textSearchSetting').forEach(key => {
            expression.push(filters[key] === '' ? true : map.get(key) !== null ? map.get(key).toString().toUpperCase().includes(filters[key].toString().toUpperCase()) : false);
          });
          if (expression.every((item) => item === true)) return true;
        }
        return false;
      })
    }))
  }
}
