import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Subscription } from 'rxjs';
import { ApplicationInfo } from '../../../models/generated/generated';
import { SpinnerData } from '../../../models/spinner-data';
import { AccountService } from '../../../services/account.service';
import { ApplicationService } from '../../../services/data/application.service';
import { SpinnerService } from '../../../services/spinner/spinner.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent  {

  loaderData: SpinnerData = {
    type: 'ProgressBar',
    title: 'loading'
  };
  onDestroy$ = new Subject();
  companyName = "Hechinger Hungary Kft.";
  logo = 'assets/images/logo.png';
  currentLang!: string;
  langChangeSubscription: Subscription;
  applicationInformation: ApplicationInfo;
  constructor(private router: Router,
    private readonly applicationService: ApplicationService,
    private accountService: AccountService,
    public readonly spinnerService: SpinnerService,
    public translateService: TranslateService) {
    if (this.langChangeSubscription) this.langChangeSubscription.unsubscribe();
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(x => this.currentLang = x.lang);
    this.router.events.subscribe(x => {
      if (x instanceof NavigationEnd) {
        if (x.url.includes('login')) this.loaderData.title = "logininprogress";
        if (x.url.includes('forgot-password')) this.loaderData.title = "newpasswordrequestinprogress";
        if (x.url.includes('change-temporary-password')) this.loaderData.title = "changepasswordinprogress";
      }
    });
    this.applicationService.get().subscribe(appInfo => {
      this.applicationInformation = appInfo;
    });
    if (this.accountService.isAuthenticated()) this.router.navigate(['/']);
  }
  setLanguage(key: string, $event: any) {
    $event.stopPropagation();
    $event.preventDefault();
    this.translateService.use(key);
  }
  ngOnDestroy(): void {
    if (this.langChangeSubscription) this.langChangeSubscription.unsubscribe();
    this.onDestroy$.next(null);
  }

}
