import { UntypedFormGroup } from "@angular/forms";

declare module '@angular/forms' {
  interface FormGroup {
    setOriginalForm: (this: FormGroup) => FormGroup;
    isChanged: (this: FormGroup) => boolean;
    getOriginalForm: (this: FormGroup) => FormGroup;
    removeDeletedItem: (this: FormGroup, index: number) => FormGroup;
  }
}

UntypedFormGroup.prototype.isChanged = function (this: UntypedFormGroup) {
  let oFormString = sessionStorage.getItem("originalForm");
  return oFormString !== JSON.stringify(this.value)
};

UntypedFormGroup.prototype.setOriginalForm = function (this: UntypedFormGroup) {
  sessionStorage.setItem("originalForm", JSON.stringify(this.value));
  return this;
}

UntypedFormGroup.prototype.getOriginalForm = function (this: UntypedFormGroup) {
  let form = sessionStorage.getItem("originalForm")
  if (form) return JSON.parse(form);
  
}





