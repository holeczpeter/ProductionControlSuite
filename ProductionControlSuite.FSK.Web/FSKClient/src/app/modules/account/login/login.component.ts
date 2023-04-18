import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginModel, LoginResults } from '../../../models/generated/generated';
import { AccountService } from '../../../services/account.service';
import { ConfirmDialogService } from '../../../services/confirm-dialog/confirm-dialog-service';
import { ResultBuilder } from '../../../services/result/result-builder';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { SpinnerService } from '../../../services/spinner/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  formGroup = this.fb.group({
    code: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  onDestroy$ = new Subject();

  constructor(private readonly accountService: AccountService,
    private readonly router: Router,
    private readonly confirmDialogService: ConfirmDialogService,
    private readonly snackBarService: SnackbarService,
    private readonly fb: UntypedFormBuilder,
    public readonly spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
  }
  forgotPassword() {
    this.confirmDialogService.openInformation("confirmDialog.helpFromIT").subscribe();
  }
  onSubmit() {
    let request: LoginModel = { code: this.formGroup.get('code')?.value, password: this.formGroup.get('password')?.value }
    this.accountService.login(request).subscribe(x => {
      switch (x.loginStatus) {

        case LoginResults.Success:
          let success = new ResultBuilder().setSuccess(true).setMessage("account.loginSuccesful").setErrors([`Üdv, ${x.userInfo.name}`]).build();
          this.snackBarService.open(success);
          this.router.navigateByUrl('/home');
          break;
        case LoginResults.IsTemporaryPassword:
          this.router.navigateByUrl('account/change-temporary-password');
          break;
        case LoginResults.IsNotValidPassword:
          const isNotValidPassword = "account.wrongPassword";
          let isNotValidPasswordRes = new ResultBuilder().setSuccess(false).setMessage('account.loginUnSuccesful').setErrors([isNotValidPassword]).build();
          this.snackBarService.open(isNotValidPasswordRes);
          break;
        case LoginResults.NotExistUser:
          const notExistUser = "user.notFound";
          let notExistUserRes = new ResultBuilder().setSuccess(false).setMessage('account.loginUnSuccesful').setErrors([notExistUser]).build();
          this.snackBarService.open(notExistUserRes);
          break;
        default:
      }
    }, err => {
      let notExistUserRes = new ResultBuilder().setSuccess(false).setMessage('account.loginUnSuccesful').setErrors([err]).build();
      this.snackBarService.open(notExistUserRes);
    });
  }
}
