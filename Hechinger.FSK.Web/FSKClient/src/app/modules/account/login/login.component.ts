import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginModel } from '../../../models/generated';
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
    this.accountService.login(request);
  }
}
