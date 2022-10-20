import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { SpinnerData } from '../../../models/spinner-data';
import { AccountService } from '../../../services/account.service';
import { SpinnerService } from '../../../services/spinner/spinner.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent  {

  loaderData: SpinnerData = {
    type: 'ProgressBar',
    title: 'Betöltés folyamatban...'
  };
  onDestroy$ = new Subject();
  companyName = "Hechinger Hungary Kft.";
  logo = 'assets/images/logo.png';
  currentLang!: string;
  constructor(private router: Router,
    private accountService: AccountService,
    public readonly spinnerService: SpinnerService,
    public translateService: TranslateService) {
    this.translateService.onLangChange.subscribe(x => this.currentLang = x.lang);
    this.router.events.subscribe(x => {
      if (x instanceof NavigationEnd) {
        if (x.url.includes('login')) this.loaderData.title = "Belépés folyamatban...";
        if (x.url.includes('register')) this.loaderData.title = "Regisztáció folyamatban...";
        if (x.url.includes('resetPassword')) this.loaderData.title = "Jelszó kérése folyamatban...";
        if (x.url.includes('changePass')) this.loaderData.title = "Jelszó beállítása folyamatban...";
      }
    });
    if (this.accountService.isAuthenticated()) this.router.navigate(['/']);
  }
  setLanguage(key: string, $event: any) {
    $event.stopPropagation();
    $event.preventDefault();
    this.translateService.use(key);
  }
  ngOnDestroy(): void {
    this.onDestroy$.next(null);
  }

}
