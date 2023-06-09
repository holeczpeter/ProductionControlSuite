import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { Result } from '../../models/generated/generated';
import { LanguageService } from '../language/language.service';


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
  constructor(private readonly snackBar: MatSnackBar,
    public lang: LanguageService,
    public translate: TranslateService) {
  }

  open(result: Result) {
    if (result && result.isSuccess) this.config.panelClass = 'success';
    else this.config.panelClass = 'error';
    this.openSnackbar(result);
  }
  openInfo(result: Result) {
    this.config.panelClass = 'info';
    this.openSnackbar(result)
  }
  openSnackbar(result: Result)
  {
    forkJoin(this.translate.get(result.message), this.translate.get("close")).subscribe(([resultText, close]) => {
      this.snackBar.open(resultText, close, this.config);
    });
  }
  openMore(results: Array<Result>) {

    if (results) {
      results.forEach((result, index) => {
        if (!result) return;
        let panelClass = "";
        if (result && result.isSuccess) panelClass = 'success';
        else panelClass = 'error';
        setTimeout(() => {
          forkJoin(this.translate.get(result.message), this.translate.get(result.errors)).subscribe(([resultText, error]) => {
         
            let currentLangMessage = result.isSuccess ? resultText : resultText + ": " + error;
            this.snackBar.open(currentLangMessage, 'Bezár', {
              duration: this.timeOut,
              horizontalPosition: 'right',
              verticalPosition: 'top',
              panelClass: panelClass,
            });

          });
          
        }, index * (this.timeOut + 500));
      });
    }


  }
}
