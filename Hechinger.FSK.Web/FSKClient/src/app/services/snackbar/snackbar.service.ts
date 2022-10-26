import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Result } from '../../models/generated/generated';


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  timeOut = 1500;
  actionButtonLabel: 'Ok' | undefined;
  config: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  }
  constructor(private readonly snackBar: MatSnackBar) {
  }

  open(result: Result) {

    if (result && result.isSuccess) this.config.panelClass = 'success';
    else this.config.panelClass = 'error';

    var errors = result.errors && result.errors.length > 0 ? ": " + result.errors : "";
    this.snackBar.open(result.message + errors, 'Bezár', this.config);
  }

  openMore(results: Array<Result>) {

    if (results) {
      results.forEach((result, index) => {
        if (!result) return;
        let panelClass = "";
        if (result && result.isSuccess) panelClass = 'success';
        else panelClass = 'error';
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
