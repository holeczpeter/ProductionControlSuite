import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { TableColumn } from '../../models/table-column';

@Injectable({
  providedIn: 'root'
})
export class DefectFilterService {
 
  private form: UntypedFormGroup;

  
  getValue(prop: string): string {
    return this.form && this.form.get(prop) && this.form.get(prop)?.value != null ? this.form.get(prop)?.value : '';
  }
  constructor() {
  }
  createFilterFormGroup(filterableColumns: Array<TableColumn>): UntypedFormGroup {
    this.form = new UntypedFormGroup({});
    filterableColumns.forEach(x => {
      this.form.addControl(x.name, new UntypedFormControl());
    });
    this.valueChanges();
    return this.form;
  }
  valueChanges() {
    this.form.valueChanges.subscribe(x => {
      console.log(x)
    });
  }
  
}
