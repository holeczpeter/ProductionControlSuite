import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { TableColumnModel } from '../../models/table-column-model';

@Injectable({
  providedIn: 'root'
})
export class DefectFilterService {
 
  private form: UntypedFormGroup;
  getForm() {
    return this.form;
  }
  
  getValue(prop: string): string {
    return this.form && this.form.get(prop) && this.form.get(prop)?.value != null ? this.form.get(prop)?.value : '';
  }
  constructor() {
  }
  createFilterFormGroup(filterableColumns: Array<TableColumnModel>): UntypedFormGroup {
    this.form = new UntypedFormGroup({});
    filterableColumns.forEach(x => {
      this.form.addControl(x.name, new UntypedFormControl());
    });
    this.valueChanges();
    console.log(this.form)
    return this.form;
  }
  valueChanges() {
    this.form.valueChanges.subscribe(x => {
      
    });
  }
  
}
