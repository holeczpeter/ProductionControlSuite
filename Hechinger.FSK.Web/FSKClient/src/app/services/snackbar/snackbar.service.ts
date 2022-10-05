import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ApiResult } from '../../models/api-result';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  timeOut = 1500;
  actionButtonLabel: 'Ok' | undefined;
  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  }
  constructor(private readonly snackBar: MatSnackBar) {
  }

  open(result: ApiResult) {

    if (result && result.isSuccess) this.config.panelClass = 'success';
    else this.config.panelClass = 'notSuccess';

    var errors = result.errors && result.errors.length > 0 ? ": " + result.errors : "";
    this.snackBar.open(result.message + errors, 'Bezár', this.config);
  }

  openMore(results: Array<ApiResult>) {

    if (results) {
      results.forEach((result, index) => {
        if (!result) return;
        let panelClass = "";
        if (result && result.isSuccess) panelClass = 'success';
        else panelClass = 'notSuccess';
        setTimeout(() => {
          let message = result.isSuccess ? result.message : result.message + ": " + result.errors;
          this.snackBar.open(message, 'Bezár', {
            duration: this.timeOut,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: panelClass,
          });
        }, index * (this.timeOut + 500));
      });
    }


  }
}
