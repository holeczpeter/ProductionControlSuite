import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AccountService } from '../../../services/account.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { SpinnerService } from '../../../services/spinner/spinner.service';
import { CustomValidator } from '../../../validators/custom-validator';
import { passwordEqualityValidator } from '../../../validators/password-equality-validator';

@Component({
  selector: 'app-change-temporary-password',
  templateUrl: './change-temporary-password.component.html',
  styleUrls: ['./change-temporary-password.component.scss']
})
export class ChangeTemporaryPasswordComponent implements OnInit, OnDestroy {
  formGroup!: UntypedFormGroup;
  hideOld = true;
  hideNew = true;
  hideNewRe = true;
  destroy$: Subject<any> = new Subject();
  constructor(private fb: UntypedFormBuilder,
    private accountService: AccountService,
    private readonly snackBarService: SnackbarService,
    private router: Router,
    public spinnerService: SpinnerService) { }
    

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      code: ['', [Validators.required]],
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
  }
  onSubmit() {
    this.accountService.changePassword(this.formGroup.getRawValue()).subscribe(x => {
      this.snackBarService.open(x);
      if (x.isSuccess == true) {
        this.accountService.logout()
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(null);
  }
}

