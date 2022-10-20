import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  formGroup = this.fb.group({
    code: ['', [Validators.required]]
  });

  constructor(private fb: UntypedFormBuilder,
    private accountService: AccountService,
    private readonly snackBar: SnackbarService,
    private router: Router) {
  }
  ngOnInit() {
  }
  onSubmit(event: Event) {
    this.accountService.forgotPassword(this.formGroup.getRawValue()).subscribe(x => {
      this.snackBar.open(x);
      if (x.isSuccess) this.router.navigateByUrl('/account/login');
    });
  }

}
