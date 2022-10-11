import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginModel, LoginResults } from '../../../models/generated';
import { AccountService } from '../../../services/account.service';
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
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  onDestroy$ = new Subject();

  constructor(private readonly accountService: AccountService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly fb: UntypedFormBuilder,
    public readonly spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let request: LoginModel = { code: this.formGroup.get('code')?.value, password: this.formGroup.get('password')?.value }
    this.accountService.login(request).subscribe(x => {
      if (x.loginStatus === LoginResults.Success) {
        this.snackBar.open(
          `Sikeres bejelentkezés\nÜdv, ${x.userInfo.name}`,
          'OK',
          {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            duration: 3000
          });
        this.router.navigateByUrl('basic-data/workshop');

      }
      else {
        if (x.loginStatus === LoginResults.IsTemporaryPassword) {
          this.router.navigateByUrl('account/change-password');
        }
        else {
          const errorMessage = x.loginStatus === LoginResults.IsNotValidPassword ? "Nem megfelelő jelszó" : "Felhasználó nem létezik";
          this.snackBar.open(
            `Sikertelen bejelentkezés!\n${errorMessage}`,
            'OK',
            {
              verticalPosition: 'top',
              horizontalPosition: 'right',
              duration: 3000
            });
        }

      }
    }, err => {
      this.snackBar.open(
        `Sikertelen bejelentkezés!\n${err}`,
        'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          duration: 3000
        });
    });
  }
}
