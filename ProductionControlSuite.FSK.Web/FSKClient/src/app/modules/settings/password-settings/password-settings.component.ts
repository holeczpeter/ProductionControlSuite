import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HasComponentUnsavedChanges } from '../../../guards/auth.guard';
import { AccountService } from '../../../services/account.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { SpinnerService } from '../../../services/spinner/spinner.service';
import { CustomValidator } from '../../../validators/custom-validator';
import { passwordEqualityValidator } from '../../../validators/password-equality-validator';

@Component({
  selector: 'app-password-settings',
  templateUrl: './password-settings.component.html',
  styleUrls: ['./password-settings.component.scss']
})
export class PasswordSettingsComponent implements OnInit, OnDestroy, HasComponentUnsavedChanges {
  title = "changepassword";
  formGroup!: UntypedFormGroup;
  hideOld = true;
  hideNew = true;
  hideNewRe = true;
  destroy$: Subject<any> = new Subject();

  constructor(private fb: UntypedFormBuilder,
    private accountService: AccountService,
    private readonly snackBarService: SnackbarService,
    public spinnerService: SpinnerService) { }
   

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      code: [this.accountService.getCode(), [Validators.required]],
      oldPassword: ['', [Validators.required]],
      newPassword: [null, Validators.compose([
        Validators.required,
        CustomValidator.patternValidator(/\d/, { hasNumber: true }),
        CustomValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
        Validators.minLength(8)])
      ],
      newPasswordRe: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.formGroup.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.formGroup.setValidators(passwordEqualityValidator())
    });
    this.formGroup.setOriginalForm();
  }
  onSubmit() {
    this.accountService.changeTemporaryPassword(this.formGroup.getRawValue()).subscribe(x => {
      this.snackBarService.open(x);
      if (x.isSuccess == true) {
        this.accountService.logout()
      }
    });
  }
  
  hasUnsavedChanges(): boolean {
    return this.formGroup.isChanged();
  }
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
