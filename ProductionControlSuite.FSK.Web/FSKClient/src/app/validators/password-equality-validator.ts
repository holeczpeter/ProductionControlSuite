import { UntypedFormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";


export function passwordEqualityValidator(): ValidatorFn  {
  return (group: UntypedFormGroup): ValidationErrors | null => {
    const control1 = group.controls['newPassword'];
    const control2 = group.controls['newPasswordRe'];
    if (!control1 || !control2) {
      control1.setErrors(null);
      control2.setErrors(null);
    }
    if (control1.value !== control2.value) {
      control1.setErrors({ 'notEquals': true });
      control2.setErrors({ 'notEquals': true });
    }
    else {
      control1.setErrors(null);
      control2.setErrors(null);
    }
    return null;
  };
}
