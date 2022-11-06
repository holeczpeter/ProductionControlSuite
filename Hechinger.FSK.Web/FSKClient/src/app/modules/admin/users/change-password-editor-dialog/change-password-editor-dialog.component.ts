import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { UserModel } from '../../../../models/generated/generated';
import { AccountService } from '../../../../services/account.service';
import { LanguageDataService } from '../../../../services/data/language-data.service';
import { UserDataService } from '../../../../services/data/user-data.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { CustomValidator } from '../../../../validators/custom-validator';

@Component({
  selector: 'app-change-password-editor-dialog',
  templateUrl: './change-password-editor-dialog.component.html',
  styleUrls: ['./change-password-editor-dialog.component.scss']
})
export class ChangePasswordEditorDialogComponent implements OnInit {
  formGroup!: UntypedFormGroup;
  hideOld = true;
  hideNew = true;
  hideNewRe = true;
  destroy$: Subject<any> = new Subject();
  title = this.data ? "users.edit" : "users.add";
  constructor(private readonly dialogRef: MatDialogRef<ChangePasswordEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel,
    private readonly userDataService: UserDataService,
    private readonly accountService: AccountService,
    private readonly languageDataService: LanguageDataService,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly snackBar: SnackbarService) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      code: [this.data.code, [Validators.required]],
     
      newPassword: [null, Validators.compose([
        Validators.required,
        CustomValidator.patternValidator(/\d/, { hasNumber: true }),
        CustomValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
        Validators.minLength(8)])
      ],
      newPasswordRe: [null, Validators.compose([
        Validators.required,
        CustomValidator.patternValidator(/\d/, { hasNumber: true }),
        CustomValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
        Validators.minLength(8)])
      ],
    });
    
  
  }
  onSubmit() {
    this.accountService.changePasswordByAdmin(this.formGroup.getRawValue()).subscribe(x => {
      this.snackBar.open(x);
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(null);
  }
  onCancel() {
    this.dialogRef.close(false);
  }
}
